import { Sequelize } from "sequelize-typescript";
import { InvoiceModel, InvoiceItemModel } from "../repository/";

import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async () => {
    // const repository = new InvoiceRepository();
    //const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    /* const findInvoiceUseCase = new FindInvoiceUseCase(repository);*/
    //const facade = new InvoiceFacade(generateInvoiceUseCase, undefined);
    const facade = InvoiceFacadeFactory.create();

    const result = await facade.generate({
      name: "name",
      document: "document",
      street: "street",
      complement: "complement",
      city: "city",
      number: "number",
      state: "state",
      zipCode: "zipCode",
      items: [{ id: "1", name: "name", price: 10 }],
    });

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBe("name");
    expect(result.document).toBe("document");
    expect(result.street).toBe("street");
    expect(result.complement).toBe("complement");
    expect(result.city).toBe("city");
    expect(result.number).toBe("number");
    expect(result.state).toBe("state");
    expect(result.items).toBeDefined();
    expect(result.items.length).toBe(1);
    expect(result.total).toBe(10);
  });

  it("should find an invoice", async () => {
    await InvoiceModel.create(
      {
        id: "1",
        name: "John Doe",
        document: "123456789",
        street: "Mountain Street",
        number: "101",
        complement: "apto",
        city: "Village City",
        state: "NY",
        zipCode: "10000000",
        items: [
          {
            id: "item-id-0001",
            name: "kit mouse e teclado",
            price: 110,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [{ model: InvoiceItemModel }] }
    );
    // const repository = new InvoiceRepository();
    /* const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository); */
    // const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    // const facade = new InvoiceFacade(undefined, findInvoiceUseCase);
    const facade = InvoiceFacadeFactory.create();
    const result = await facade.find({ id: "1" });
    expect(result).toBeDefined();
    expect(result.id).toBe("1");
    expect(result.name).toBe("John Doe");
    expect(result.document).toBe("123456789");
    expect(result.address.street).toBe("Mountain Street");
    expect(result.address.number).toBe("101");
    expect(result.address.complement).toBe("apto");
    expect(result.address.city).toBe("Village City");
    expect(result.address.state).toBe("NY");
    expect(result.address.zipCode).toBe("10000000");
    expect(result.items).toBeDefined();
    expect(result.items.length).toBe(1);
    expect(result.total).toBe(110);
  });
});
