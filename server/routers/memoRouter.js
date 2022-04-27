import express from "express";
import { memoModel } from "../models";

const memoRouter = express.Router();

memoRouter.route("/get-all/").get(async (req, res, next) => {
  try {
    const data = await memoModel.find({});
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

memoRouter.route("/post/").post(async (req, res, next) => {
  try {
    await memoModel.insertMany([req.body]);
    return res.status(200).send("memo post successful.");
  } catch (err) {
    return res.status(400).send(err);
  }
});

memoRouter.route("/put/").put(async (req, res, next) => {
  try {
    const result = await memoModel.findOneAndUpdate(
      { _id: req.query.id },
      { $set: { text: req.body.text } },
      { upsert: true, returnNewDocument: true }
    );
    if (result) {
      return res.status(200).send("Memo updated.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

memoRouter.route("/delete/").delete(async (req, res, next) => {
  try {
    const query = { _id: req.query.id };
    const result = await memoModel.deleteOne(query);
    if (result.deletedCount === 1) {
      return res.status(200).send("Delete successful.");
    } else {
      return res.status(400).send("Delete unsuccessful.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default memoRouter;