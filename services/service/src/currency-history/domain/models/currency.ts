import { Types } from "mongoose";
import { CurrencyHistory } from "./currency-history";

export class Currency {
  private _id: Types.ObjectId;
  private _code: string;
  private _hasSubscription: boolean;
  private _history: Record<string, CurrencyHistory>

  private constructor({ id, code, hasSubscription, history }) {
    this._id = id;
    this._code = code;
    this._hasSubscription = hasSubscription;
    this._history = history;
  }

  static fromPrimitives({ id, code, hasSubscription, history }) {
    return new Currency({
      id: id,
      code: code,
      hasSubscription: hasSubscription,
      history,
    });
  }

  get id(): Types.ObjectId {
    return this._id;
  }

  get code(): string {
    return this._code;
  }

  get hasSubscription(): boolean {
    return this._hasSubscription;
  }

  get history(): Record<string, CurrencyHistory> {
    return this._history;
  }

}
