import { AlphavantageAPI } from "@app/utils";
import {
  Currency,
  ICurrencyRepository,
} from "../domain";
import { MongooseCurrencyRepository } from "../infrastructure";
import { CurrencyHistory } from "../domain/models";

const exchangeApi = new AlphavantageAPI();

export class SubscribeCurrency {
  private currencyRepository: ICurrencyRepository;
  constructor({ currencyRepository = new MongooseCurrencyRepository() }) {
    this.currencyRepository = currencyRepository;
  }

  async execute(currencyReq) {
    const currency = await this.currencyRepository.findByCode(currencyReq.code);

    if (currency) {
      currency.subscribe();
      await this.currencyRepository.changeSubscription(currency);
      return currency;
    }

    // Initialize timeseries
    const history = await exchangeApi.getTimeseries('EUR', currencyReq.code);
    const newCurrency = Currency.create({ code: currencyReq.code, history: history });
    await this.currencyRepository.subscribe(newCurrency as Currency);
    return newCurrency;
  }
}
