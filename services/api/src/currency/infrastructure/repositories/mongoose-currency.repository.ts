import { Currency, ICurrencyRepository } from "@app/currency/domain";
import { Nullable } from "@app/utils";
import CurrencyModel from '@app/currency/infrastructure/schema/mongoose-currency.schema'

export class MongooseCurrencyRepository implements ICurrencyRepository {
  private toDomain(currencyDB) {
    return Currency.fromPrimitives({
      id: currencyDB._id,
      code: currencyDB.code,
      hasSubscription: currencyDB.hasSubscription,
      history: currencyDB.history,
    });
  }

  private fromDomain(currency: Currency) {
    return {
      _id: currency.id,
      code: currency.code,
      hasSubscription: currency.hasSubscription,
      history: currency.history,
    };
  }

  async subscribe(currency: Currency): Promise<void> {
    const mongooseCurrency = this.fromDomain(currency);
    await CurrencyModel.create(mongooseCurrency);
  }

  async findAllSubscriptions(history: boolean = false): Promise<Currency[]> {
    let query = CurrencyModel.find({
      hasSubscription: true,
    });

    if (history) query = query.populate('history');
    const subscribedCurrencies = await query;
    return subscribedCurrencies.map((currency) => this.toDomain(currency));
  }

  async findByCode(code: string): Promise<Nullable<Currency>> {
    const currency = await CurrencyModel.findOne({ code: code });
    return currency === null ? null : this.toDomain(currency);
  }

  async changeSubscription(currency: Currency): Promise<void> {
    const document = this.fromDomain(currency);
    await CurrencyModel.updateOne({ _id: currency.id }, { $set: document });
  }
}
