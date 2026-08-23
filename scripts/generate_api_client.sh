#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
GENERATOR_VERSION="7.24.0"
GENERATOR_SHA256="4b83ccc6fd43056c8c631cd0195e5100bd0550912502527bab09ac76152dab0c"
GENERATOR_DIR="${REPO_ROOT}/.tooling/openapi-generator"
GENERATOR_JAR="${GENERATOR_DIR}/openapi-generator-cli-${GENERATOR_VERSION}.jar"
GENERATOR_URL="https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${GENERATOR_VERSION}/openapi-generator-cli-${GENERATOR_VERSION}.jar"
JAVA_BIN="${JAVA_BIN:-java}"

mkdir -p "${GENERATOR_DIR}"

if [[ ! -f "${GENERATOR_JAR}" ]]; then
  curl --fail --location --retry 3 "${GENERATOR_URL}" --output "${GENERATOR_JAR}"
elif ! printf '%s  %s\n' "${GENERATOR_SHA256}" "${GENERATOR_JAR}" | sha256sum --check --status; then
  printf 'A retomar o download parcial de %s.\n' "${GENERATOR_JAR}"
  curl --fail --location --retry 3 --continue-at - \
    "${GENERATOR_URL}" --output "${GENERATOR_JAR}"
fi

printf '%s  %s\n' "${GENERATOR_SHA256}" "${GENERATOR_JAR}" | sha256sum --check --status || {
  printf 'Checksum inválido para %s.\n' "${GENERATOR_JAR}" >&2
  exit 1
}

cd "${REPO_ROOT}"
"${JAVA_BIN}" -jar "${GENERATOR_JAR}" validate -i contracts/openapi.yaml
"${JAVA_BIN}" -jar "${GENERATOR_JAR}" generate \
  --config tool/openapi-generator-config.yaml \
  --minimal-update
"${SCRIPT_DIR}/dartw" format packages/api_client/lib

pushd packages/api_client >/dev/null
"${SCRIPT_DIR}/dartw" pub get
"${SCRIPT_DIR}/dartw" run build_runner build
"${SCRIPT_DIR}/dartw" analyze
popd >/dev/null
