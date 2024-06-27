import { Address, Id } from "../../../@shared/domain/value-object";
import { Invoice, InvoiceItem } from "../../domain/";
import FindInvoiceUseCase from "./find-invoice.usecase";

const address = new Address("street", "101", "apto", "city", "SP", "13000000");

const invoice = new Invoice({
  id: new Id("1"),
  address,
  document: "123456789",
  items: [
    new InvoiceItem({ price: 39.9, name: "mouse" }),
    new InvoiceItem({ price: 59.9, name: "keyboard" }),
    new InvoiceItem({ price: 109.9, name: "headphone" }),
  ],
  name: "John Doe",
});

const mockRepository = () => ({
  generate: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
});

describe("FindInvoiceUsecase test", () => {
  it("should find an invoice", async () => {
    const repository = mockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const result = await usecase.execute("1");

    expect(result).toBeDefined();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.total).toEqual(invoice.total);
  });
});
