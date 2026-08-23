#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const REQUIRED = [
  "README.md",
  "AGENTS.md",
  "SPEC_STATUS.md",
  "specs/00-scope.md",
  "specs/01-product.md",
  "specs/02-domain-ledger.md",
  "specs/03-security.md",
  "specs/04-flutter.md",
  "specs/05-owner-settlement.md",
  "specs/06-acceptance.md",
  "contracts/openapi.yaml",
  "tickets/backlog.md",
];

const expectedIds = (prefix, count) =>
  Array.from(
    { length: count },
    (_, index) => `${prefix}${String(index + 1).padStart(3, "0")}`,
  );

const EXPECTED_REQUIREMENTS = expectedIds("FR-PRD-", 18);
const EXPECTED_ACCEPTANCE = expectedIds("AC-", 18);
const EXPECTED_TICKETS = expectedIds("KG-", 21);
const EXPECTED_PATHS = new Set([
  "/passenger/wallet",
  "/passenger/payment-alias",
  "/passenger/payment-alias/block",
  "/passenger/payment-alias/replace",
  "/collector/payment-intents",
  "/passenger/payment-intents/{intentId}/approve",
  "/passenger/payment-intents/{intentId}/decline",
  "/owner/overview",
  "/owner/settlements/close",
  "/owner/operating-allowances",
]);
const FINANCIAL_COMMANDS = [
  ["/collector/payment-intents", "post"],
  ["/passenger/payment-intents/{intentId}/approve", "post"],
  ["/owner/settlements/close", "post"],
  ["/owner/operating-allowances", "post"],
];
const IGNORED_DIRS = new Set([
  ".dart_tool",
  ".git",
  ".gradle",
  ".pub-cache",
  ".tooling",
  "build",
  "coverage",
  "dist",
  "node_modules",
]);
const NORMATIVE_NAMES = new Set([
  "SPEC_STATUS.md",
  "openapi.yaml",
  "backlog.md",
  "BACKLOG.md",
]);

function fail(message) {
  console.error(`FAIL: ${message}`);
}

function sameArray(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function sameSet(left, right) {
  return left.size === right.size && [...left].every((item) => right.has(item));
}

function collectNormativeCopies(directory = ROOT) {
  const copies = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory() && !IGNORED_DIRS.has(entry.name)) {
      copies.push(...collectNormativeCopies(path));
    } else if (entry.isFile() && NORMATIVE_NAMES.has(entry.name)) {
      copies.push(path);
    }
  }

  return copies;
}

function read(relativePath) {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

function main() {
  let errors = 0;

  for (const path of REQUIRED) {
    const absolute = join(ROOT, path);
    if (!existsSync(absolute) || !statSync(absolute).isFile()) {
      fail(`missing required file: ${path}`);
      errors += 1;
    }
  }

  if (errors > 0) return 1;

  for (const path of ["kwanzago-sdd-v0.4", join("docs", "notion")]) {
    if (existsSync(join(ROOT, path))) {
      fail(`obsolete baseline container still exists: ${path}`);
      errors += 1;
    }
  }

  const expectedCopies = new Set([
    join(ROOT, "SPEC_STATUS.md"),
    join(ROOT, "contracts", "openapi.yaml"),
    join(ROOT, "tickets", "backlog.md"),
  ]);
  const unexpectedCopies = collectNormativeCopies()
    .filter((path) => !expectedCopies.has(path))
    .sort();
  if (unexpectedCopies.length > 0) {
    fail(
      `duplicate normative files found: ${unexpectedCopies
        .map((path) => relative(ROOT, path))
        .join(", ")}`,
    );
    errors += 1;
  }

  const statusText = read("SPEC_STATUS.md");
  if (!statusText.includes("Versão: `0.4.0`")) {
    fail("SPEC_STATUS.md must declare version 0.4.0");
    errors += 1;
  }
  if (!statusText.includes("READY_FOR_BACKEND_BUILD")) {
    fail("SPEC_STATUS.md must declare READY_FOR_BACKEND_BUILD");
    errors += 1;
  }
  if (!statusText.includes("uma única\nbaseline normativa na raiz")) {
    fail("SPEC_STATUS.md must declare the single root normative baseline");
    errors += 1;
  }

  const requirementIds = [
    ...read("specs/01-product.md").matchAll(/^- (FR-PRD-[0-9]{3}):/gm),
  ].map((match) => match[1]);
  if (!sameArray(requirementIds, EXPECTED_REQUIREMENTS)) {
    fail(
      `requirement inventory differs: expected ${EXPECTED_REQUIREMENTS.join(
        ", ",
      )}, got ${requirementIds.join(", ")}`,
    );
    errors += 1;
  }

  const acceptanceIds = [
    ...read("specs/06-acceptance.md").matchAll(/^(AC-[0-9]{3})\s/gm),
  ].map((match) => match[1]);
  if (!sameArray(acceptanceIds, EXPECTED_ACCEPTANCE)) {
    fail(
      `acceptance inventory differs: expected ${EXPECTED_ACCEPTANCE.join(
        ", ",
      )}, got ${acceptanceIds.join(", ")}`,
    );
    errors += 1;
  }

  const ticketIds = [
    ...read("tickets/backlog.md").matchAll(
      /^\|\s*[0-9]+\s*\|\s*(KG-[0-9]{3})\s*\|/gm,
    ),
  ].map((match) => match[1]);
  if (!sameArray(ticketIds, EXPECTED_TICKETS)) {
    fail(
      `ticket inventory differs: expected ${EXPECTED_TICKETS.join(
        ", ",
      )}, got ${ticketIds.join(", ")}`,
    );
    errors += 1;
  }
  const duplicateTickets = ticketIds.filter(
    (ticket, index) => ticketIds.indexOf(ticket) !== index,
  );
  if (duplicateTickets.length > 0) {
    fail(
      `duplicate ticket IDs: ${[...new Set(duplicateTickets)].sort().join(", ")}`,
    );
    errors += 1;
  }

  let spec;
  try {
    spec = parse(read("contracts/openapi.yaml"));
  } catch (error) {
    fail(
      `OpenAPI parse failed: ${error instanceof Error ? error.message : error}`,
    );
    return 1;
  }

  if (spec.openapi !== "3.1.0") {
    fail("OpenAPI version must be 3.1.0");
    errors += 1;
  }
  if (spec.info?.version !== "0.4.0") {
    fail("OpenAPI info.version must match baseline 0.4.0");
    errors += 1;
  }

  const paths = spec.paths ?? {};
  if (!sameSet(new Set(Object.keys(paths)), EXPECTED_PATHS)) {
    fail("OpenAPI path inventory differs from the reviewed v0.4 contract");
    errors += 1;
  }
  if (!sameArray(spec.security, [{ bearerAuth: [] }])) {
    fail("OpenAPI must require bearerAuth globally");
    errors += 1;
  }

  const methods = new Set(["delete", "get", "patch", "post", "put"]);
  const operationIds = Object.values(paths).flatMap((pathItem) =>
    Object.entries(pathItem ?? {})
      .filter(
        ([method, operation]) =>
          methods.has(method.toLowerCase()) &&
          operation !== null &&
          typeof operation === "object",
      )
      .map(([, operation]) => operation.operationId),
  );
  if (
    operationIds.includes(undefined) ||
    operationIds.length !== new Set(operationIds).size
  ) {
    fail("every OpenAPI operation must have a unique operationId");
    errors += 1;
  }

  for (const [path, method] of FINANCIAL_COMMANDS) {
    const refs = new Set(
      (paths[path]?.[method]?.parameters ?? [])
        .filter((parameter) => parameter && typeof parameter === "object")
        .map((parameter) => parameter.$ref),
    );
    if (!refs.has("#/components/parameters/IdempotencyKey")) {
      fail(
        `financial command lacks Idempotency-Key: ${method.toUpperCase()} ${path}`,
      );
      errors += 1;
    }
  }

  const schemas = spec.components?.schemas ?? {};
  const forbiddenContext = {
    CreatePaymentIntent: new Set([
      "collectorId",
      "deviceId",
      "operatorId",
      "ownerId",
      "vehicleId",
    ]),
    ApprovePaymentIntent: new Set([
      "deviceId",
      "operatorId",
      "ownerId",
      "passengerId",
      "vehicleId",
    ]),
  };
  for (const [schemaName, forbidden] of Object.entries(forbiddenContext)) {
    const properties = Object.keys(schemas[schemaName]?.properties ?? {});
    const trusted = properties
      .filter((property) => forbidden.has(property))
      .sort();
    if (trusted.length > 0) {
      fail(`${schemaName} trusts body context fields: ${trusted.join(", ")}`);
      errors += 1;
    }
  }

  const idempotencyKey = spec.components?.parameters?.IdempotencyKey ?? {};
  if (idempotencyKey.in !== "header" || idempotencyKey.required !== true) {
    fail("IdempotencyKey must be a required header");
    errors += 1;
  }

  if (errors > 0) {
    console.error(`Validation failed with ${errors} error(s).`);
    return 1;
  }

  console.log(
    `OK: one v0.4 baseline, ${REQUIRED.length} required files, ` +
      `${requirementIds.length} requirements, ${acceptanceIds.length} acceptance tests, ` +
      `${ticketIds.length} tickets and ${Object.keys(paths).length} OpenAPI paths.`,
  );
  return 0;
}

process.exitCode = main();
