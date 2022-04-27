import express from "express";
import { orderModel } from "../models";

const orderRouter = express.Router();

orderRouter.route("/get-all/").get(async (req, res, next) => {
  try {
    const data = await orderModel.find({});
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

orderRouter.route("/get-users/").get(async (req, res, next) => {
  try {
    const data = await orderModel.find({ user_email: req.query.email });
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

orderRouter.route("/post-order/").post(async (req, res, next) => {
  try {
    await orderModel.insertMany([req.body]);
    return res.status(200).send("order post successful.");
  } catch (err) {
    return res.status(400).send(err);
  }
});

orderRouter.route("/put-status/").put(async (req, res, next) => {
  try {
    const result = await orderModel.findOneAndUpdate(
      { _id: req.body.order_id },
      { $set: { status: req.body.status } },
      { upsert: true, returnNewDocument: true }
    );
    if (result) {
      return res.status(200).send("Order status updated.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

orderRouter.route("/bid/").put(async (req, res, next) => {
  try {
    const result = await orderModel.findOne({ _id: req.body.order_id });
    const isFound = result.bid.some((element) => {
      if (element.email === req.body.bid.email) {
        return true;
      }
    });
    if (!isFound) {
      await orderModel.findOneAndUpdate(
        { _id: req.body.order_id },
        { $push: { bid: req.body.bid } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.status(200).send("bid post successful.");
    } else {
      result.bid.forEach((object) => {
        if (object.email == req.body.bid.email) {
          object.money = req.body.bid.money;
          result.save();
          return res.status(200).send("bid edit successful.");
        }
      });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

orderRouter.route("/delete/").delete(async (req, res, next) => {
  try {
    const query = { _id: req.query.id };
    const result = await orderModel.deleteOne(query);
    if (result.deletedCount === 1) {
      return res.status(200).send("Delete successful.");
    } else {
      return res.status(400).send("Delete unsuccessful.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

orderRouter.route("/put/").put(async (req, res, next) => {
  try {
    await orderModel.findOneAndUpdate({ _id: req.query.id }, req.body, {
      new: true,
      upsert: true,
    });
    return res.status(200).send("User modification successful. ");
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default orderRouter;