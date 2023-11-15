import { CurrencyHistory } from "./currency-history";

export class Currency {
    _code: string;
    _hasSubscription: boolean;
    _history: Record<string, CurrencyHistory>
}