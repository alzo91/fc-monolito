import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import { Id, Address } from "../../@shared/domain/value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import InvoiceItemModel from "./invoice-item.model";
export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<{ id: string }> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      },
      { include: [{ model: InvoiceItemModel }] }
    );
    return { id: invoice.id.id };
  }

  async find(id: string): Promise<Invoice> {
    const result = await InvoiceModel.findOne({
      where: { id },
      include: [InvoiceItemModel],
    });
    if (!result) {
      throw new Error("Invoice not found");
    }

    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: new Address(
        result.street,
        result.number,
        result.complement,
        result.city,
        result.state,
        result.zipCode
      ),
      items: result.items.map((item) => {
        return new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        });
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }
}
