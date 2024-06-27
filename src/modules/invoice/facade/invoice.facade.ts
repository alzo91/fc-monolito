import { FindInvoiceUseCase, GenerateInvoiceUseCase } from "../usecase";
import {
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
  InvoiceFacadeInterface,
} from "./invoice.facade.interface";

export class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(
    private readonly generateUseCase: GenerateInvoiceUseCase,
    private readonly findUseCase: FindInvoiceUseCase
  ) {}

  async generate(
    invoice: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this.generateUseCase.execute(invoice);
  }

  async find(params: { id: string }): Promise<FindInvoiceFacadeOutputDTO> {
    return await this.findUseCase.execute(params.id);
  }
}
