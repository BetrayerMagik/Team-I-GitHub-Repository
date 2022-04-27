import mongoose from "mongoose";

const memoSchemaModel = new mongoose.Schema({
  text: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date,
    required: true,
  },
});

const memoModel = mongoose.model("memos", memoSchemaModel);
export default memoModel;