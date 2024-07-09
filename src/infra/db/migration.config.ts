import { Sequelize } from "sequelize-typescript";

import { join, resolve } from "path";
import { migrator } from "./migrator";

const path = __dirname;
const storage_path = join(resolve(path, "..", "..", ".."), "db.sqlite");
console.log("storage_path: " + storage_path);

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", // storage_path,
  logging: false,
});

export async function runMigrations() {
  await migrator(sequelize).runAsCLI();
  // await migrator(sequelize).up({});
}

export async function dbDown(db: Sequelize) {
  const runner = migrator(db);
  const result = await runner.executed();
  await runner.down({ migrations: result.map((item) => item.name) });
  await sequelize.query(`DROP TABLE invoice_items`);
  await sequelize.query(`DROP TABLE invoices`);
  await sequelize.query(`DROP TABLE orders`);
  await sequelize.query(`DROP TABLE transactions`);
}

/* dbDown(sequelize)
  .then((_) => console.log("dbDown success"))
  .catch((err) => console.log("error", err));
*/

runMigrations()
  .then((result) => console.log("then", result))
  .catch((err) => console.log("error", err));
