import express, { Express } from "express";

import { OrderModel } from "../modules/checkout/repository/order.model";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../modules/invoice/repository/invoice-item.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import StoreCatalogProductModel from "../modules/store-catalog/repository/product.model";
import { ProductModel as AdmProductModel } from "../modules/product-adm/repository/product.model";
import { sequelize } from "../infra/db/migration.config";
import { migrator } from "../infra/db/migrator";

import { productsRoute } from "./routes/product.route";
import { clientsRoute } from "./routes/client.route";
import { checkoutRoute } from "./routes/checkout.route";
import { invoicesRoute } from "./routes/invoice.route";

export const app: Express = express();
app.use(express.json());

app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoicesRoute);

// export let sequelize: Sequelize;

export async function setupDb() {
  sequelize.addModels([InvoiceModel, InvoiceItemModel]);

  await migrator(sequelize).up({});
  await sequelize.sync({ force: true });

  sequelize.addModels([
    OrderModel,
    ClientModel,
    InvoiceModel,
    InvoiceItemModel,
    TransactionModel,
    StoreCatalogProductModel,
    AdmProductModel,
  ]);

  return { sequelize, migrator };
}
