import mongoose from "mongoose";

const orderSchemaModel = new mongoose.Schema({
  date: {
    type: Date,
    default: Date,
    required: true,
  },
  method: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  bid: [
    {
      email: {
        type: String,
        required: false,
      },
      money: {
        type: String,
        required: false,
      },
    },
  ],
  user_email: {
    type: String,
    required: false,
  },
  food: [
    {
      name: {
        type: String,
        required: false,
      },
      cost: {
        type: String,
        required: false,
      },
    },
  ],
});

const orderModel = mongoose.model("orders", orderSchemaModel);
export default orderModel;