import { CurrencyHistory, ICurrencyRepository } from "../../domain";
import { CurrencyHistoryModel, CurrencyModel } from "../schema";
import { Currency } from "../../domain/models/currency";


export class MongooseCurrencyRepository implements ICurrencyRepository {
    private fromDomain(currencyHistory: CurrencyHistory) {
        return {
            date: currencyHistory.date,
            code: currencyHistory.code,
            low: currencyHistory.low,
            high: currencyHistory.high,
            close: currencyHistory.close,
            open: currencyHistory.open
        };
    }
    private toDomain(currencyDB) {
        return Currency.fromPrimitives({
          id: currencyDB._id,
          code: currencyDB.code,
          hasSubscription: currencyDB.hasSubscription,
          history: currencyDB.history,
        });
    }

    async updateHistory(currency: Currency, newHistory: Record<string, CurrencyHistory>): Promise<void> {
        const ratesByDate = Object.entries(newHistory);
        const res = await CurrencyHistoryModel.bulkWrite(
            ratesByDate.map(([date, rates]) => {
                const {
                    _id,
                    ...update
                } = rates;
                return {
                    updateOne: {
                        filter: {
                            date: date,
                            code: currency.code
                        },
                        update,
                        upsert: true,
                    }
                }
            })
        );
        const curr = await CurrencyModel.findById(currency.id)
        res.result.upserted.forEach(({ index, _id }) => {
            curr.history.set(
                ratesByDate[index].at(0),
                _id,
            )
        })
        await curr.save();
    }

    async getSubscriptions(): Promise<Currency[]> {
        const curr = await CurrencyModel.find({ hasSubscription: true });
        return curr.map((currency) => this.toDomain(currency));
    }
}