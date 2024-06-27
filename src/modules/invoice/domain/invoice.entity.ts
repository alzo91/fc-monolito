import { AggregateRoot, BaseEntity } from "../../@shared/domain/entity";
import { Address, Id } from "../../@shared/domain/value-object/";

import InvoiceItem from "./invoice-item.entity";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address; // value object
  items: InvoiceItem[]; // Invoice Items entity
  createdAt?: Date; // criada automaticamente
  updatedAt?: Date; // criada automaticamente
};
export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address; // value object
  private _items: InvoiceItem[]; // Invoice Items entity

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  get name(): string {
    return this._name;
  }
  get document(): string {
    return this._document;
  }
  get address(): Address {
    return this._address;
  }
  get items(): InvoiceItem[] {
    return this._items;
  }

  get total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
