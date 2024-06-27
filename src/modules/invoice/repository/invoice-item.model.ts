import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoice_items",
  timestamps: false,
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  price: number;

  @ForeignKey(() => InvoiceModel)
  @Column
  invoice_id: string;

  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel;
}
