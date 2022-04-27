import mongoose from "mongoose";

const menuSchemaModel = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  cost: {
    type: String,
    required: false,
  },
  reviews: [
    {
      review: {
        type: String,
        required: false,
      },
      rating: {
        type: String,
        required: false,
      },
    },
  ],
  date: {
    type: Date,
    default: Date,
    required: true,
  },
});

const menuModel = mongoose.model("menus", menuSchemaModel);
export default menuModel;