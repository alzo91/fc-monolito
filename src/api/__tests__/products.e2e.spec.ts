import { Sequelize } from "sequelize-typescript";
import request from "supertest";

import { app, setupDb } from "../express";
import { dbDown } from "../../infra/db/migration.config";

describe("E2E test for product", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    const { sequelize: db } = await setupDb();
    sequelize = db;
    // await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await dbDown(sequelize);
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      id: "1",
      name: "Shirt",
      description: "A good shirt",
      stock: 10,
      purchasePrice: 20,
    });

    expect(response.status).toEqual(201);
  });
});
