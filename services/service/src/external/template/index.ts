import { CurrencyHistory } from "../../currency-history/domain/models";

export default interface ConversionAPI {
    getTimeseries(from: string, to: string): Promise<Record<string, CurrencyHistory>>
}