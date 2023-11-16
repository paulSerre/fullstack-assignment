import { CurrencyHistory, ICurrencyRepository } from "../domain";
import { Currency } from "../domain/models/currency";
import { MongooseCurrencyRepository } from "../infra";

export class UpdateHistoryCurrency {
  private currencyRepository: ICurrencyRepository;
  constructor({ currencyRepository = new MongooseCurrencyRepository() }) {
    this.currencyRepository = currencyRepository;
  }

  async execute(currency: Currency, newHistory: Record<string, CurrencyHistory>) {
    return await this.currencyRepository.updateHistory(currency, newHistory);
  }
}
