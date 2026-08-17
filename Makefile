# StackQL clickhouse (ClickHouse Cloud) provider build pipeline.
#
# Every step is deterministic and re-runnable; manual mapping decisions live
# in provider-dev/scripts, never in hand-edited artifacts. `make all` runs
# the full chain: fetch/pin the spec -> inventory -> split service specs ->
# mappings -> pre-normalize -> normalize -> generate -> post-process ->
# offline + integration + meta-route tests -> docs -> website build.
# `make smoke` (live, needs credentials) is separate so `all` never bills.
#
# Requirements: Node >= 20, GNU make, a stackql binary ($STACKQL, ./stackql
# or on PATH), Python 3 (a venv with pystackql is created on demand for the
# smoke suite), yarn for the website. Runs under Linux / WSL / macOS.
#
# Live credentials for the smoke suite (never committed - .env is
# gitignored; `make smoke` sources it if present):
#   CLICKHOUSE_CLOUD_API_KEY, CLICKHOUSE_CLOUD_API_SECRET, CLICKHOUSE_ORG_ID

SHELL := bash
.DEFAULT_GOAL := help

PROVIDER := clickhouse
SERVICES_DIR := provider-dev/openapi/src/$(PROVIDER)
# The org-scoped server template ({organizationId} resolved from
# CLICKHOUSE_ORG_ID via x-stackQL-envVar) is the single source of truth in
# provider-dev/config/servers.json - shared by bin/split.mjs and this file.
SERVERS := $(shell tr -d '\n' < provider-dev/config/servers.json)
PROVIDER_CONFIG := {"auth": {"type": "basic", "username_var": "CLICKHOUSE_CLOUD_API_KEY", "password_var": "CLICKHOUSE_CLOUD_API_SECRET"}}
# NOTE: no pagination config is shipped - every list endpoint returns the
# complete bounded collection (verified in the endpoint inventory, NOTES.md).
VENV := .venv
PY := $(VENV)/bin/python
ENV_FILE := .env

.PHONY: help deps fetch-spec refresh-spec inventory split mappings pre-normalize normalize generate post-process build \
        test-offline test-integration test-meta test smoke smoke-service smoke-public smoke-cleanup venv \
        docs website website-start clean all

help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-18s %s\n", $$1, $$2}'

deps: ## install node dependencies (latest @stackql/provider-utils per package.json range)
	npm install

# ---------------------------------------------------------------- pipeline

fetch-spec: ## download the ClickHouse Cloud spec and verify it against the pin (fails on drift)
	npm run fetch-spec

refresh-spec: ## download the spec and ACCEPT the upstream change (rewrites the pin - review the diff)
	npm run fetch-spec -- --update

inventory: ## build provider-dev/config/endpoint_inventory.csv from the pinned spec
	npm run build-inventory

split: ## split the pinned spec into per-service specs on the org-scoped server template
	npm run split -- --provider-name $(PROVIDER) --overwrite

mappings: ## regenerate all_services.csv from scratch and apply the deterministic verb mappings
	rm -f provider-dev/config/all_services.csv
	npm run generate-mappings -- --provider-name $(PROVIDER) --input-dir provider-dev/source --output-dir provider-dev/config
	npm run map-operations

pre-normalize: ## clickhouse-specific spec adjustments (OpenAPI 3.1 type-array lowering)
	node provider-dev/scripts/pre_normalize.mjs

normalize: ## generic provider-utils normalize pass (oneOf/allOf flatten, ...)
	npm run normalize -- --api-dir provider-dev/source

generate: ## generate the provider (basic auth, org-scoped servers, naive request body translate)
	rm -rf provider-dev/openapi/*
	npm run generate-provider -- \
	  --provider-name $(PROVIDER) \
	  --input-dir provider-dev/source \
	  --output-dir $(SERVICES_DIR) \
	  --config-path provider-dev/config/all_services.csv \
	  --servers '$(SERVERS)' \
	  --provider-config '$(PROVIDER_CONFIG)' \
	  --naive-req-body-translate \
	  --overwrite
	$(MAKE) post-process

post-process: ## re-apply generated-provider fixes (organization-root path server override)
	node provider-dev/scripts/post_process.mjs

build: fetch-spec inventory split mappings pre-normalize normalize generate ## full spec -> provider pipeline

# ------------------------------------------------------------------- tests

test-offline: ## quick offline validation against the local file registry (SHOW / DESCRIBE)
	node tests/offline_validation.mjs

test-integration: ## row-level integration tests against the mock ClickHouse Cloud API
	node tests/integration/run_integration_tests.mjs

test-meta: ## meta-route suite against a local stackql server
	npm run start-server
	npm run test-meta-routes -- $(PROVIDER) || (npm run stop-server; exit 1)
	npm run stop-server

test: test-offline test-integration test-meta ## all non-live test layers

$(VENV)/bin/activate:
	python3 -m venv $(VENV)
	$(VENV)/bin/pip install --quiet --upgrade pip pystackql

venv: $(VENV)/bin/activate ## create the python venv with pystackql for the smoke suite

# `make smoke` sources .env when present so a developer checkout works
# without exporting anything; CI sets the three variables from secrets.
with_env = set -a; [ -f $(ENV_FILE) ] && source <(tr -d '' < $(ENV_FILE)); set +a;

smoke: venv ## live smoke suite with the locally generated provider - reads + API key lifecycle (needs credentials)
	@$(with_env) $(PY) tests/smoke_test.py

smoke-service: venv ## live smoke suite INCLUDING the billable service create/stop/delete lifecycle
	@$(with_env) $(PY) tests/smoke_test.py --with-service

smoke-public: venv ## live smoke suite against the published provider (post-publish verification)
	@$(with_env) $(PY) tests/smoke_test.py --registry public

smoke-cleanup: venv ## sweep stackql-smoke-* keys and services and exit
	@$(with_env) $(PY) tests/smoke_test.py --cleanup-only

# -------------------------------------------------------------------- docs

docs: ## generate the website docs from the generated provider, then sanitize
	npm run generate-docs -- \
	  --provider-name $(PROVIDER) \
	  --provider-dir ./$(SERVICES_DIR)/v00.00.00000 \
	  --output-dir ./website \
	  --provider-data-dir ./provider-dev/docgen/provider-data
	node website/scripts/sanitize-docs.mjs

website: ## build the docusaurus microsite (vendors shared config first)
	cd website && yarn install && yarn build

website-start: ## run the docusaurus dev server
	cd website && yarn install && yarn start

clean: ## remove generated artifacts (provider output, docs, website build, test registry copy)
	rm -rf provider-dev/openapi/* website/build website/.docusaurus website/docs/services tests/integration/.registry-tmp

all: deps build test docs website ## everything non-billable: deps, pipeline, tests, docs, site build
