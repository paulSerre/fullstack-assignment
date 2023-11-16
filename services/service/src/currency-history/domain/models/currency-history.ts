import { Types } from "mongoose";
import {
  IncorrectCurrencyError,
} from "../errors";

export class CurrencyHistory {
  _id: Types.ObjectId;
  date: string;
  code: string;
  open: number;
  close: number;
  high: number;
  low: number;

  private constructor({ id, code, date, open, close, high, low }) {
    this._id = id;
    this.code = code;
    this.date = date;
    this.open = open;
    this.close = close
    this.high = high
    this.low = low
  }

  static fromPrimitives({ id = undefined, code, date, open, close, high, low }) {
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
}
