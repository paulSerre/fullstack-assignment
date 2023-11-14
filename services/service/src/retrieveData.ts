import { AlphavantageAPI } from './external/alphavantage';
import { BASE_CURRENCY } from './utils/Constants';
import { CurrencyHistoryModel, CurrencyModel } from './models'
import ConversionAPI from './utils/template';

const api: ConversionAPI = new AlphavantageAPI();

export const retrieveData = async () => {
    const subscribedCurrencies = await CurrencyModel.find({
        hasSubscription: true,
    });
    const promises = subscribedCurrencies.map(async (currency) => {
        const data = await api.getTimeseries(BASE_CURRENCY, currency.code);
        const rateData = Object.entries(data);
        const res = await CurrencyHistoryModel.bulkWrite(
            rateData.map(([key, value]) => ({
                updateOne: {
                    filter: {
                        date: key,
                        code: currency.code
                    },
                    update: value,
                    upsert: true,
                }
            }))
        );
        res.result.upserted.forEach(({ index, _id }) => {
            currency.history.set(
                rateData[index].at(0),
                _id,
            )
        })
        await currency.save();
    });
    return await Promise.all(promises);
}
