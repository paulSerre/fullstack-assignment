export default interface ConversionAPI {
    getTimeseries(from: string, to: string): Promise<Record<string, Record<string, number>>>
}