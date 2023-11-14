import { Schema, model } from "mongoose";

const CurrencyHistorySchema = new Schema({
    date: {
        type: Schema.Types.String,
        index: true,
    },
    code: String,
    open: Number,
    close: Number,
    high: Number,
    low: Number
  });

CurrencyHistorySchema.index({ date: -1, code: 1 }, { unique: true, })

const CurrencyHistoryModel = model("CurrencyHistory", CurrencyHistorySchema);

export default CurrencyHistoryModel;