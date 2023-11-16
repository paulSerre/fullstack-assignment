import { model, Schema } from "mongoose";
import {CurrencyHistoryModel} from "./mongoose-currency-history.schema";

const CurrencySchema = new Schema(
  {
    code: String,
    hasSubscription: Boolean,
    history: {
      type: Map,
      of: {
        type: Schema.Types.ObjectId,
        ref: CurrencyHistoryModel,
      },
      default: () => new Map()
    }
  },
  {
    timestamps: true,
  }
);

const CurrencyModel = model("Currency", CurrencySchema);

export { CurrencyModel };
