import { ICurrencyRepository } from "../domain";
import { MongooseCurrencyRepository } from "../infra";

export class GetSubscribedCurrencies {
  private currencyRepository: ICurrencyRepository;
  constructor({ currencyRepository = new MongooseCurrencyRepository() }) {
    this.currencyRepository = currencyRepository;
  }

  async execute() {
    return await this.currencyRepository.getSubscriptions();
  }
}
