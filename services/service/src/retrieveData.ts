import { BASE_CURRENCY } from './utils/Constants';
import ConversionAPI from './external/template';
import { AlphavantageAPI } from './external/alphavantage';
import { GetSubscribedCurrencies } from './currency-history/application/get-subscribed-currencies';
import { UpdateHistoryCurrency } from './currency-history/application/update-currency-history';

const api: ConversionAPI = new AlphavantageAPI();
const getSubscribedCurrencies = new GetSubscribedCurrencies({});
const updateHistoryCurrency = new UpdateHistoryCurrency({});

export const retrieveData = async () => {
    const subscriptions = await getSubscribedCurrencies.execute();
    const promises = subscriptions.map(async (currency) => {
        const history = await api.getTimeseries(BASE_CURRENCY, currency.code);
        await updateHistoryCurrency.execute(currency, history);
    });
    await Promise.all(promises);
}
