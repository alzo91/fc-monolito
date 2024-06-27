import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import Invoice from "../domain/invoice.entity";
import { Address, Id } from "../../@shared/domain/value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import InvoiceRepository from "./invoice.repository";

const address = new Address(
  "Rua A",
  "123",
  "apto 1",
  "São Paulo",
  "SP",
  "12345678"
);

const items = [
  new InvoiceItem({ price: 39.9, name: "mouse" }),
  new InvoiceItem({ price: 59.9, name: "keyboard" }),
  new InvoiceItem({ price: 109.9, name: "headphone" }),
];

const invoice = new Invoice({
  address,
  document: "123456789",
  items,
  name: "John Doe",
});

describe("InvoiceRepository test", () => {
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

  it("should save an invoice", async () => {
    const repository = new InvoiceRepository();

    await repository.generate(invoice);

    const result = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [InvoiceItemModel],
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.street).toBe(address.street);
    expect(result.number).toBe(address.number);
    expect(result.complement).toBe(address.complement);
    expect(result.city).toBe(address.city);
    expect(result.state).toBe(address.state);
    expect(result.zipCode).toBe(address.zipCode);
    expect(result.items.length).toBe(items.length);
    expect(result.items.reduce((acc, item) => acc + item.price, 0)).toBe(
      invoice.total
    );
  });

  it("should find an invoice", async () => {
    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const result = await repository.find(invoice.id.id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(invoice.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address).toEqual(invoice.address);
    expect(result.items.length).toBe(invoice.items.length);
    expect(result.total).toBe(invoice.total);
  });
});
