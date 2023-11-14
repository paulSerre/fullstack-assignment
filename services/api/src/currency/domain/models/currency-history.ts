import { Types } from "mongoose";
import {
  IncorrectCurrencyError,
} from "../errors";

export class CurrencyHistory {
  private _id: Types.ObjectId;
  private _date: string;
  private _code: string;
  private _open: boolean;
  private _close: boolean;
  private _high: boolean;
  private _low: boolean;

  private constructor({ id, code, date, open, close, high, low }) {
    this._id = id;
    this._code = code;
    this._date = date;
    this._open = open;
    this._close = close
    this._high = high
    this._low = low
  }

  static fromPrimitives({ id, code, date, open, close, high, low }) {
    return new CurrencyHistory({
      id,
      code,
      date,
      open,
      close,
      high,
      low
    });
  }

  static create({ id = new Types.ObjectId(), date, code, open, close, high, low }) {
    if (!code) {
      return IncorrectCurrencyError.withCode(code);
    }

    return new CurrencyHistory({
      id: id,
      code: code,
      date,
      open,
      close,
      high,
      low
    });
  }

  get id(): Types.ObjectId {
    return this._id;
  }

  get code(): string {
    return this._code;
  }

  get open(): boolean {
    return this._open;
  }

  get close(): boolean {
    return this._close;
  }

  get high(): boolean {
    return this._high;
  }

  get low(): boolean {
    return this._low;
  }

  updateRates({
    open = this._open,
    close = this._close,
    high = this._high,
    low = this._low,
    }) {
      this._open = open;
      this._close = close;
      this._high = high;
      this._low = low;
    }
}
