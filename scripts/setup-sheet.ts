/**
 * Prepares the leads spreadsheet: four tabs, header row, frozen.
 *   1. Put the Google variables in .env.local (see .env.example)
 *   2. npm run leads:setup-sheet
 */
import { readLeadConfig } from "../src/lib/leads/config";
import { setupLeadSheet } from "../src/lib/leads/sheet-setup";

async function main() {
  try {
    process.loadEnvFile?.(".env.local");
  } catch {
    /* no .env.local: use the environment as-is */
  }
  const config = readLeadConfig();
  if (!config.sheets) {
    console.error("✗ Set GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY first (see .env.example).");
    process.exit(1);
  }
  const { created, headed } = await setupLeadSheet({
    ...config.sheets, tokenUrl: config.endpoints.googleToken, sheetsBase: config.endpoints.sheets, fetchImpl: fetch,
  });
  console.log(created.length ? `✓ Created tabs: ${created.join(", ")}` : "✓ All four tabs already existed");
  console.log(`✓ Header row written and frozen on: ${headed.join(", ")}`);
}

main().catch((e) => {
  console.error(`✗ ${(e as Error).message}`);
  process.exit(1);
});
