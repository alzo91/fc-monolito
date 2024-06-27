import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";

@Table({
  tableName: "invoices",
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  document: string;

  @Column
  street: string;

  @Column
  number: string;

  @Column
  complement: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  zipCode: string;

  @HasMany(() => InvoiceItemModel)
  declare items: InvoiceItemModel[];

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
