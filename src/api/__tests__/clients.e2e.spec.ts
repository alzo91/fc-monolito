import { Sequelize } from "sequelize-typescript";
import request from "supertest";

import { app, setupDb } from "../express";
import { dbDown } from "../../infra/db/migration.config";

describe("E2E test for client", () => {
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

  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
      id: "1",
      name: "john doe",
      email: "john.doe@email.com",
      document: "215251",
      address: "Main Street. 123",
    });

    expect(response.status).toEqual(201);
  });

  // it("should not create a client when name is not provided", async () => {
  //   const response = await request(app).post("/clients").send({
  //     id: "1",
  //     email: "john.doe@email.com",
  //     document: "215251",
  //     address: "Main Street. 123",
  //   });

  //   expect(response.status).toEqual(400);
  // });
});
