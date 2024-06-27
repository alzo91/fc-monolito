export interface GenerateInvoiceFacadeInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export type GenerateInvoiceFacadeOutputDto = GenerateInvoiceFacadeInputDto & {
  id: string;
  total: number;
};

export interface FindInvoiceFacadeOutputDTO {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}

export abstract class InvoiceFacadeInterface {
  abstract generate(
    invoice: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto>;
  abstract find(params: { id: string }): Promise<FindInvoiceFacadeOutputDTO>;
}
