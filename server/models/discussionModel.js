import mongoose from "mongoose";

const discussionSchemaModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date,
    required: true,
  },
});

const discussionModel = mongoose.model("discussions", discussionSchemaModel);
export default discussionModel;