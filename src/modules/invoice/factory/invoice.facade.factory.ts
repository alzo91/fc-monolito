import { InvoiceFacade } from "../facade/invoice.facade";
import { InvoiceRepository } from "../repository";
import { FindInvoiceUseCase, GenerateInvoiceUseCase } from "../usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    return new InvoiceFacade(generateInvoiceUseCase, findInvoiceUseCase);
  }
}
