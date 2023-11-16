import { CurrencyHistory } from "../models";
import { Currency } from "../models/currency";

export interface ICurrencyRepository {
  updateHistory(currency: Currency, newHistory: Record<string, CurrencyHistory>): Promise<void>;
  getSubscriptions(): Promise<Currency[]>;
}
