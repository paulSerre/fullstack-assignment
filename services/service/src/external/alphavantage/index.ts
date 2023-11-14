import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import ConversionAPI from '../../utils/template';

declare var ALPHAVANTAGE_API_KEY: string;

const alphavantageConfig: CreateAxiosDefaults = {
    baseURL: 'https://www.alphavantage.co/',
    params: {
        apikey: ALPHAVANTAGE_API_KEY,
    },
}

export class AlphavantageAPI implements ConversionAPI {

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create(alphavantageConfig)
    }

    async getTimeseries(from: string, to: string): Promise<Record<string, Record<string, number>>> {
        const { data } = await this.api.get(
            'query',
            {
                params: {
                    function: 'FX_DAILY',
                    from_symbol: from,
                    to_symbol: to,
                }
            }
        );
        const timeSeries = data['Time Series FX (Daily)'];
        const transformedData: Record<string, Record<string, number>> = {};
        for (const date in timeSeries) {
            transformedData[date] = {
                open: parseFloat(timeSeries[date]["1. open"]),
                high: parseFloat(timeSeries[date]["2. high"]),
                low: parseFloat(timeSeries[date]["3. low"]),
                close: parseFloat(timeSeries[date]["4. close"])
            };
        }
        return transformedData;
    }
    
}