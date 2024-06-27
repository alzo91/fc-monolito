import Invoice from "../domain/invoice.entity";

export default abstract class InvoiceGateway {
  abstract generate(invoice: Invoice): Promise<{ id: string }>;
  abstract find(id: string): Promise<Invoice>;
}
