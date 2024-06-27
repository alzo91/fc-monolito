import { Address } from "../../../@shared/domain/value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const address = new Address("street", "101", "apto", "city", "SP", "13000000");

const invoice = new Invoice({
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
  generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  find: jest.fn(),
});

describe("Generate invoice use-case unit test ", () => {
  it("should be able to create an invoice", async () => {
    const repository = mockRepository();
    const useCase = new GenerateInvoiceUseCase(repository);
    const input = {
      state: address.state,
      city: address.city,
      street: address.street,
      number: address.number,
      complement: address.complement,
      zipCode: address.zipCode,
      name: invoice.name,
      document: invoice.document,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
    };

    const result = await useCase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.total).toBe(
      invoice.items.reduce((acc, item) => acc + item.price, 0)
    );
    expect(result.items.length).toBe(invoice.items.length);
  });
});
