#!/usr/bin/env python3
"""pystackql smoke test for the clickhouse (ClickHouse Cloud) stackql provider.

Exercises the salient resources against a real ClickHouse Cloud organization:
read smokes over organizations / services / members / keys / roles /
activities / usage cost, then a disposable write lifecycle - an API key
INSERT, SELECT, UPDATE (state + ipAccessList replacement), DELETE - and,
only when explicitly requested with --with-service, a smallest-footprint
service created, stopped via the EXEC state command, and deleted within the
run (services bill by usage; the flag keeps that a deliberate choice).

Everything created is named `stackql-smoke-<stamp>`; before running, the
script sweeps keys and services with the stackql-smoke- prefix so each run
starts from a clean slate and a failed run cannot leave billable services
behind past the next run (a stopped service is still swept and deleted).

Credentials and target organization come from the environment, exactly as
the provider itself reads them:

    export CLICKHOUSE_CLOUD_API_KEY=...      # Key ID (basic-auth username)
    export CLICKHOUSE_CLOUD_API_SECRET=...   # Key Secret (basic-auth password)
    export CLICKHOUSE_ORG_ID=...             # resolves the organizationId server
                                             # variable (x-stackQL-envVar)

Rate limiting: the API allows a fixed window of requests per API key
(documented as 10 per 10 seconds; the live authenticated policy header
reports 40;w=10). Every statement is paced by INTER_REQUEST_DELAY_S; a 429
is a harness bug and fails the run.

Never run this against a production organization.

Usage:
    pip install pystackql
    python tests/smoke_test.py                    # local registry (default), key lifecycle
    python tests/smoke_test.py --with-service     # also the billable service lifecycle
    python tests/smoke_test.py --registry public  # published provider in the stackql registry
    python tests/smoke_test.py --cleanup-only     # just sweep breadcrumbs
    python tests/smoke_test.py --read-only        # read smokes only, no writes
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from datetime import date, timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
SMOKE_PREFIX = "stackql-smoke-"
INTER_REQUEST_DELAY_S = 1.2  # < 10 requests per 10 s with margin (see NOTES.md)
# x-stackQL-envVar server variable resolution (CLICKHOUSE_ORG_ID) landed in
# stackql v0.10.601 (any-sdk v0.5.4-alpha01, stackql/stackql#707). pystackql
# manages its own stackql binary, so the harness upgrades it when older.
MIN_STACKQL_VERSION = (0, 10, 601)

ERROR_RE = re.compile(
    r"http response status code: [45]|over HTTP error|error assembling|"
    r"cannot find matching operation|FindRoute|no matching operation|"
    r"cannot find any viable servers|parser error|panic|"
    r"no request body for operation|schema unsuitable|UNAUTHORIZED|FORBIDDEN",
    re.I,
)
RATE_LIMIT_RE = re.compile(r"status code: 429|TOO_MANY_REQUESTS|rate limit", re.I)


class Smoke:
    def __init__(self, args: argparse.Namespace) -> None:
        self.args = args
        self.stamp = str(int(time.time()))[-6:]
        self.name = f"{SMOKE_PREFIX}{self.stamp}"
        self.results: list[tuple[str, str, str]] = []
        self.requests = 0

        for var in ("CLICKHOUSE_CLOUD_API_KEY", "CLICKHOUSE_CLOUD_API_SECRET", "CLICKHOUSE_ORG_ID"):
            if not os.environ.get(var):
                sys.exit(f"{var} is not set - see the module docstring")

        from pystackql import StackQL

        if args.registry == "local":
            reg_path = (BASE_DIR / "provider-dev" / "openapi").resolve()
            reg_url = "file://" + reg_path.as_posix()
            self.sq = StackQL(output="dict", custom_registry=reg_url)
            # pystackql only serialises {"url": ...}; a local file registry
            # additionally needs localDocRoot + nopVerify - patch the exec
            # params in place (compact JSON, shell-quoted).
            full = json.dumps(
                {"url": reg_url, "localDocRoot": reg_path.as_posix(), "verifyConfig": {"nopVerify": True}},
                separators=(",", ":"),
            )
            if sys.platform.startswith("win"):
                quoted = '"' + full.replace('"', '\\"') + '"'
            else:
                import shlex
                quoted = shlex.quote(full)
            params = self.sq.local_query_executor.params
            for i, p in enumerate(params):
                if p == "--registry":
                    params[i + 1] = quoted
                    break
        else:
            self.sq = StackQL(output="dict")
        self.ensure_stackql_version()

    def ensure_stackql_version(self) -> None:
        def parse(v: str) -> tuple[int, ...]:
            return tuple(int(x) for x in re.findall(r"\d+", str(v))[:3])

        current = parse(getattr(self.sq, "version", "") or "")
        if current and current >= MIN_STACKQL_VERSION:
            return
        print(f"stackql {self.sq.version} at {self.sq.bin_path} is older than "
              f"v{'.'.join(map(str, MIN_STACKQL_VERSION))} (x-stackQL-envVar support) - upgrading pystackql's binary")
        self.sq.upgrade(showprogress=False)
        if parse(self.sq.version) < MIN_STACKQL_VERSION:
            sys.exit(f"stackql {self.sq.version} is still too old after upgrade")

    # ------------------------------------------------------------------ core
    def q(self, sql: str):
        # serial pacing under the per-key rate limit
        if self.requests:
            time.sleep(INTER_REQUEST_DELAY_S)
        self.requests += 1
        try:
            if sql.lstrip().upper().startswith(("SELECT", "SHOW", "DESCRIBE")) or "RETURNING" in sql.upper():
                out = self.sq.execute(sql)
            else:
                out = self.sq.executeStmt(sql)
        except Exception as exc:  # noqa: BLE001
            return [], str(exc)
        text = json.dumps(out, default=str)
        if RATE_LIMIT_RE.search(text):
            return out if isinstance(out, list) else [out], "RATE LIMITED (429) - harness pacing bug: " + text
        if ERROR_RE.search(text):
            return out if isinstance(out, list) else [out], text
        if isinstance(out, list) and out and isinstance(out[0], dict) and "error" in out[0]:
            return out, text
        return out if isinstance(out, list) else [out], None

    def step(self, name: str, sql: str, expect_rows: bool = False, contains: str | None = None):
        rows, err = self.q(sql)
        if err:
            self.results.append((name, "FAIL", err[:200]))
            print(f"  FAIL  {name}  [{err[:140]}]")
            return None
        blob = json.dumps(rows, default=str)
        if expect_rows and not rows:
            self.results.append((name, "FAIL", "expected rows, got none"))
            print(f"  FAIL  {name}  [no rows]")
            return None
        if contains and contains not in blob:
            self.results.append((name, "FAIL", f"'{contains}' not in result"))
            print(f"  FAIL  {name}  ['{contains}' not in {blob[:100]}]")
            return None
        self.results.append((name, "PASS", ""))
        print(f"  PASS  {name}")
        return rows

    def wait_for(self, name: str, sql: str, pred, timeout: int = 600, interval: int = 10):
        start = time.time()
        last = None
        while time.time() - start < timeout:
            rows, err = self.q(sql)
            last = err or json.dumps(rows, default=str)[:160]
            if not err and pred(rows):
                self.results.append((name, "PASS", f"{int(time.time() - start)}s"))
                print(f"  PASS  {name}  ({int(time.time() - start)}s)")
                return True
            time.sleep(interval)
        self.results.append((name, "FAIL", f"timeout: {last}"))
        print(f"  FAIL  {name}  [timeout: {last}]")
        return False

    # ------------------------------------------------------- breadcrumb sweep
    def cleanup_breadcrumbs(self) -> None:
        print("== breadcrumb sweep ==")
        rows, err = self.q("SELECT id, name FROM clickhouse.keys.keys")
        if err:
            print(f"  WARN key sweep list failed: {err[:120]}")
        else:
            for r in rows:
                if str(r.get("name", "")).startswith(SMOKE_PREFIX):
                    print(f"  sweeping key {r['name']}")
                    self.q(f"DELETE FROM clickhouse.keys.keys WHERE keyId = '{r['id']}'")
        rows, err = self.q("SELECT id, name, state FROM clickhouse.services.services")
        if err:
            print(f"  WARN service sweep list failed: {err[:120]}")
            return
        for r in rows:
            if not str(r.get("name", "")).startswith(SMOKE_PREFIX):
                continue
            sid, state = r["id"], r.get("state")
            print(f"  sweeping service {r['name']} (state {state})")
            if state not in ("stopped", "stopping", "terminating"):
                self.q(f"EXEC clickhouse.services.services.update_state @serviceId = '{sid}', @command = 'stop'")
            self.wait_for(
                f"sweep: {r['name']} stopped",
                f"SELECT state FROM clickhouse.services.services WHERE serviceId = '{sid}'",
                lambda rows: rows and rows[0].get("state") in ("stopped", "terminating"),
            )
            self.q(f"DELETE FROM clickhouse.services.services WHERE serviceId = '{sid}'")

    # -------------------------------------------------------------- read path
    def read_smokes(self) -> None:
        print("== read smokes ==")
        self.step("show services", "SHOW SERVICES IN clickhouse", expect_rows=True, contains="organizations")
        self.step("organizations list (root path, no params)", "SELECT id, name FROM clickhouse.organizations.organizations", expect_rows=True)
        self.step(
            "organization get (WHERE organizationId)",
            f"SELECT name FROM clickhouse.organizations.organizations WHERE organizationId = '{os.environ['CLICKHOUSE_ORG_ID']}'",
            expect_rows=True,
        )
        self.step(
            "services estate inventory (organizationId from CLICKHOUSE_ORG_ID)",
            "SELECT id, name, state, provider, region, numReplicas, minReplicaMemoryGb, maxReplicaMemoryGb, "
            "json_extract(currentScaling, '$.effectiveAutoscalingMode') AS scaling_mode FROM clickhouse.services.services",
        )
        self.step("members audit", "SELECT userId, name, role, joinedAt FROM clickhouse.members.members", expect_rows=True)
        self.step("invitations", "SELECT id, email, role FROM clickhouse.members.invitations")
        self.step("keys by age", "SELECT id, name, state, createdAt, expireAt, usedAt FROM clickhouse.keys.keys", expect_rows=True)
        self.step("roles", "SELECT id, name FROM clickhouse.roles.roles", expect_rows=True, contains="Admin")
        self.step("quotas (usage vs limit)", "SELECT quotaCode, name, value, usage FROM clickhouse.organizations.quotas", expect_rows=True, contains="services-per-organization")
        self.step("activities (audit)", "SELECT id, type, actorType, createdAt FROM clickhouse.organizations.activities", expect_rows=True)
        to_d, from_d = date.today(), date.today() - timedelta(days=30)
        self.step(
            "usage cost by day and entity (FinOps lead)",
            "SELECT date, entityType, entityName, totalCHC, json_extract(metrics, '$.computeCHC') AS computeCHC "
            f"FROM clickhouse.organizations.usage_costs WHERE from_date = '{from_d}' AND to_date = '{to_d}'",
        )
        rows, _ = self.q("SELECT id FROM clickhouse.services.services")
        if rows:
            sid = rows[0]["id"]
            self.step("backups for first service", f"SELECT id, status, startedAt FROM clickhouse.backups.backups WHERE serviceId = '{sid}'")
            self.step("backup configuration", f"SELECT backupPeriodInHours, backupRetentionPeriodInHours FROM clickhouse.backups.backup_configurations WHERE serviceId = '{sid}'")

    # ------------------------------------------------------------- write path
    def key_lifecycle(self) -> None:
        name = self.name
        print(f"== API key lifecycle ({name}) ==")
        # Organizations migrated to Custom Roles reject the legacy `roles`
        # field ("Use 'assignedRoleIds' instead of 'roles'"); pick the least
        # privileged system role by ID, falling back to `roles` only when the
        # organization exposes no roles at all.
        roles, err = self.q("SELECT id, name FROM clickhouse.roles.roles")
        role = None
        for wanted in ("Organization API Reader", "Service API Reader", "Basic Service API Reader"):
            role = next((r for r in roles or [] if r.get("name") == wanted), None)
            if role:
                break
        if role:
            body_cols, body_vals = "assignedRoleIds", f"'[\"{role['id']}\"]'"
            how = f"assignedRoleIds=[{role['name']}]"
        else:
            body_cols, body_vals = "roles", "'[\"developer\"]'"
            how = "roles=[developer] (legacy)"
        rows = self.step(
            f"key INSERT ({how})",
            f"INSERT INTO clickhouse.keys.keys (name, {body_cols}, state) SELECT '{name}', {body_vals}, 'enabled'",
        )
        rows, err = self.q(f"SELECT id, name, state FROM clickhouse.keys.keys")
        key = next((r for r in rows or [] if r.get("name") == name), None)
        if not key:
            self.results.append(("key visible after INSERT", "FAIL", err or "not found in list"))
            print(f"  FAIL  key visible after INSERT  [{(err or 'not in list')[:120]}]")
            return
        self.results.append(("key visible after INSERT", "PASS", ""))
        print("  PASS  key visible after INSERT")
        kid = key["id"]
        self.step("key get", f"SELECT name, state FROM clickhouse.keys.keys WHERE keyId = '{kid}'", expect_rows=True, contains="enabled")
        self.step(
            "key UPDATE (state disabled + ipAccessList replacement)",
            f"UPDATE clickhouse.keys.keys SET state = 'disabled', "
            f"ipAccessList = '[{{\"source\": \"203.0.113.0/24\", \"description\": \"smoke\"}}]' WHERE keyId = '{kid}'",
        )
        self.step("key reflects UPDATE", f"SELECT state, ipAccessList FROM clickhouse.keys.keys WHERE keyId = '{kid}'", expect_rows=True, contains="203.0.113.0/24")
        self.step("key DELETE", f"DELETE FROM clickhouse.keys.keys WHERE keyId = '{kid}'")
        rows, err = self.q("SELECT id FROM clickhouse.keys.keys")
        gone = not err and all(r.get("id") != kid for r in rows)
        self.results.append(("key gone after DELETE", "PASS" if gone else "FAIL", err or ""))
        print(f"  {'PASS' if gone else 'FAIL'}  key gone after DELETE")

    def service_lifecycle(self) -> None:
        name = self.name
        print(f"== service lifecycle ({name}) - billable, keep the window short ==")
        rows, err = self.q("SELECT provider, region FROM clickhouse.services.services")
        provider = (rows[0].get("provider") if rows else None) or self.args.provider
        region = (rows[0].get("region") if rows else None) or self.args.region
        self.step(
            "service INSERT (smallest footprint: 1 replica x 8 GB, idle after 5 min)",
            f"INSERT INTO clickhouse.services.services (name, provider, region, minReplicaMemoryGb, maxReplicaMemoryGb, numReplicas, idleScaling, idleTimeoutMinutes, ipAccessList) "
            f"SELECT '{name}', '{provider}', '{region}', 8, 8, 1, true, 5, '[]'",
        )
        # the services list is eventually consistent for a few seconds after
        # a create - poll rather than read once (a miss here would strand a
        # billable service until the next run's sweep)
        found: dict = {}

        def seen(rows):
            svc = next((r for r in rows if r.get("name") == name), None)
            if svc:
                found.update(svc)
            return bool(svc)

        if not self.wait_for("service visible after INSERT", "SELECT id, name, state FROM clickhouse.services.services", seen, timeout=120, interval=5):
            return
        sid = found["id"]
        try:
            self.wait_for(
                "service provisioned",
                f"SELECT state FROM clickhouse.services.services WHERE serviceId = '{sid}'",
                lambda rows: rows and rows[0].get("state") in ("running", "idle", "stopped"),
            )
            self.step(
                "service ipAccessList UPDATE (add/remove array patch)",
                f"UPDATE clickhouse.services.services SET ipAccessList = '{{\"add\": [{{\"source\": \"203.0.113.0/24\", \"description\": \"smoke\"}}], \"remove\": []}}' "
                f"WHERE serviceId = '{sid}'",
            )
            self.step("service reflects patch", f"SELECT ipAccessList FROM clickhouse.services.services WHERE serviceId = '{sid}'", expect_rows=True, contains="203.0.113.0/24")
        finally:
            self.step("service EXEC update_state stop", f"EXEC clickhouse.services.services.update_state @serviceId = '{sid}', @command = 'stop'")
            self.wait_for(
                "service stopped",
                f"SELECT state FROM clickhouse.services.services WHERE serviceId = '{sid}'",
                lambda rows: rows and rows[0].get("state") == "stopped",
            )
            self.step("service DELETE", f"DELETE FROM clickhouse.services.services WHERE serviceId = '{sid}'")
            self.wait_for(
                "service gone",
                "SELECT id FROM clickhouse.services.services",
                lambda rows: all(r.get("id") != sid for r in rows),
                timeout=300,
            )

    # ---------------------------------------------------------------- summary
    def summary(self) -> int:
        print("\n== summary ==")
        counts = {"PASS": 0, "FAIL": 0}
        for name, status, note in self.results:
            counts[status] = counts.get(status, 0) + 1
            if status != "PASS":
                print(f"  {status:5s} {name}  [{note[:110]}]")
        print(f"  {counts['PASS']} passed, {counts['FAIL']} failed; {self.requests} statements, paced at {INTER_REQUEST_DELAY_S}s (registry: {self.args.registry})")
        return 1 if counts["FAIL"] else 0


def main() -> int:
    ap = argparse.ArgumentParser(description="clickhouse provider smoke test")
    ap.add_argument("--registry", choices=["local", "public"], default="local",
                    help="local = provider-dev/openapi file registry (default); public = default stackql registry")
    ap.add_argument("--cleanup-only", action="store_true", help="sweep stackql-smoke-* keys and services and exit")
    ap.add_argument("--read-only", action="store_true", help="read smokes only")
    ap.add_argument("--with-service", action="store_true",
                    help="also run the billable service create/stop/delete lifecycle (off by default)")
    ap.add_argument("--provider", default="aws", help="cloud provider for the smoke service if the org has no services")
    ap.add_argument("--region", default="us-east-1", help="region for the smoke service if the org has no services")
    args = ap.parse_args()

    smoke = Smoke(args)
    print(f"clickhouse smoke test  registry={args.registry}  org={os.environ['CLICKHOUSE_ORG_ID']}  "
          f"name={smoke.name}  stackql={smoke.sq.version}")
    smoke.cleanup_breadcrumbs()
    if args.cleanup_only:
        return 0
    smoke.read_smokes()
    if not args.read_only:
        smoke.key_lifecycle()
        if args.with_service:
            smoke.service_lifecycle()
    return smoke.summary()


if __name__ == "__main__":
    sys.exit(main())
