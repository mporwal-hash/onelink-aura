const { Pool } = require("pg");
const readline = require("readline");

// --- CONFIGURE your database connection here ---
const pool = new Pool({
  host: "192.168.3.185",         // DB Host
  user: "postgres",          // DB user
  password: "coms@2021",      // DB password
  database: "aura-test", // Your DB name
  port: 5432                 // DB port
});

// --- TABLE and COLUMNS config ---
const TABLE_NAME = "WhiteLabelStoreLinks"; // Your table name
const ID_COLUMN = "id"; // Your ID column name
const LINK_COLUMN = "customerSourceID"; // Column to update

// Setup readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper to ask questions in CLI
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Main function
async function main() {
  try {
    // Ask for customersourceid
    const id = await askQuestion("Enter customersourceid: ");
    if (!id) {
      console.log("customersourceid cannot be empty.");
      process.exit(1);
    }

    // Ask for short link
    const link = await askQuestion("Enter short link to save: ");
    if (!link) {
      console.log("Short link cannot be empty.");
      process.exit(1);
    }

    // Check if ID exists in DB
    const checkResult = await pool.query(
      `SELECT * FROM ${TABLE_NAME} WHERE ${ID_COLUMN} = $1`,
      [id]
    );

    if (checkResult.rowCount === 0) {
      console.log(`No record found with ${ID_COLUMN} = ${id}`);
      process.exit(1);
    }

    // Update shortDynamicLinks column
    const updateResult = await pool.query(
      `UPDATE ${TABLE_NAME} SET ${LINK_COLUMN} = $1 WHERE ${ID_COLUMN} = $2`,
      [link, id]
    );

    console.log(`Short link updated successfully for ${ID_COLUMN} = ${id}`);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
    await pool.end();
  }
}

main();
