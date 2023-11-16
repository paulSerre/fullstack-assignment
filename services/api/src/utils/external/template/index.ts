import { CurrencyHistory } from "@app/currency/domain/models";

export default interface ConversionAPI {
    getTimeseries(from: string, to: string): Promise<Record<string, CurrencyHistory>>
}