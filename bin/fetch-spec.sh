#!/usr/bin/env bash

# Downloads the ClickHouse Cloud OpenAPI spec (served unauthenticated as JSON
# at the API base, https://api.clickhouse.cloud/v1) into
# provider-dev/downloaded/, validates it with @apidevtools/swagger-parser,
# and records the fetch date and content hash in
# provider-dev/config/spec_pin.json.
#
# The spec URL is not versioned and the vendor states the API evolves, so the
# pin is the record of what was built. If a download does not match the
# recorded pin the script fails without writing anything; pass --update to
# accept the upstream change and rewrite the pin (treat the resulting spec
# diff as a reviewed refresh).
#
# Usage: bin/fetch-spec.sh [--update]

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
DOWNLOAD_DIR="$REPO_ROOT/provider-dev/downloaded"
PIN_FILE="$REPO_ROOT/provider-dev/config/spec_pin.json"

SPEC_URL="https://api.clickhouse.cloud/v1"
SPEC_FILE="clickhouse-cloud-v1.json"

UPDATE=false
if [ "${1:-}" = "--update" ]; then
  UPDATE=true
fi

mkdir -p "$DOWNLOAD_DIR"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

echo "Fetching ClickHouse Cloud spec from $SPEC_URL"
curl -fsSL "$SPEC_URL" -o "$TMP_DIR/$SPEC_FILE"

# Validate, verify against the pin (or write it), then move into place.
UPDATE="$UPDATE" TMP_DIR="$TMP_DIR" DOWNLOAD_DIR="$DOWNLOAD_DIR" PIN_FILE="$PIN_FILE" \
SPEC_URL="$SPEC_URL" SPEC_FILE="$SPEC_FILE" \
node "$REPO_ROOT/provider-dev/scripts/record_spec_pin.mjs"

echo "Spec downloaded to $DOWNLOAD_DIR/$SPEC_FILE, pin recorded in $PIN_FILE"
