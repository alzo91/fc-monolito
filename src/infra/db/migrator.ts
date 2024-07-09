import { SequelizeStorage, Umzug } from "umzug";
import { join, resolve } from "path";
import { Sequelize } from "sequelize-typescript";

const path = __dirname;
// const storage_path = join(resolve(path, "..", "..", ".."), "db.sqlite");
const migrations_path = join(path, "migrations/*.ts");

export const migrator = (sequelize: Sequelize) => {
  return new Umzug({
    migrations: { glob: migrations_path },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: null,
  });
};
