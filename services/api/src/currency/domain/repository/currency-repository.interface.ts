import { Nullable } from "src/utils";
import { Currency } from "../models/currency";
import { CurrencyHistory } from "../models";

export interface ICurrencyRepository {
  subscribe(currency: Currency): Promise<void>;
  findAllSubscriptions(history?: boolean): Promise<Currency[]>;
  findByCode(code: string): Promise<Nullable<Currency>>;
  changeSubscription(currency: Currency): Promise<void>;
}
