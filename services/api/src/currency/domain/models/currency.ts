import { Types } from "mongoose";
import {
  CurrencyAlreadySubscribedError,
  CurrencyNotSubscribedError,
  IncorrectCurrencyError,
} from "../errors";
import { CurrencyHistory } from "./currency-history";

export class Currency {
  private _id: Types.ObjectId;
  private _code: string;
  private _hasSubscription: boolean;
  private _history?: Map<string, CurrencyHistory>

  private constructor({ id, code, hasSubscription, history = new Map() }) {
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

  static create({ id = new Types.ObjectId(), code, hasSubscription = true, history = new Map() }) {
    if (!code) {
      return IncorrectCurrencyError.withCode(code);
    }

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

  get history(): Map<string, CurrencyHistory> {
    return this._history;
  }

  subscribe() {
    if (this.hasSubscription) {
      return CurrencyAlreadySubscribedError.withCode(this._code);
    }

    this._hasSubscription = true;
  }

  unsubscribe() {
    if (!this.hasSubscription) {
      return CurrencyNotSubscribedError.withCode(this._code);
    }
    this._hasSubscription = false;
  }
}
