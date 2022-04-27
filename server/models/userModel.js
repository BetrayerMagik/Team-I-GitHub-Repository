import mongoose from "mongoose";

const userSchemaModel = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  warning: {
    type: String,
    default: "0",
    required: true,
  },
  money: {
    type: String,
    required: false,
  },
  registered: {
    type: Boolean,
    default: false,
    required: true,
  },
  blacklisted: {
    type: Boolean,
    default: false,
    required: true,
  },
  messages: [
    {
      text: {
        type: String,
        required: false,
      },
      read: {
        type: Boolean,
        required: false,
      },
    },
  ],
  complaints: [
    {
      review: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        default: Date,
        required: true,
      },
    },
  ],
  complements: [
    {
      review: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        default: Date,
        required: true,
      },
    },
  ],
  orders: [
    [
      {
        name: {
          type: String,
          required: false,
        },
        cost: {
          type: String,
          required: false,
        },
        date: {
          type: Date,
          default: Date,
          required: true,
        },
        method: {
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
      },
    ],
  ],
});

const userModel = mongoose.model("users", userSchemaModel);
export default userModel;