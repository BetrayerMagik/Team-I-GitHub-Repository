import express from "express";
import { discussionModel } from "../models";

const discussionRouter = express.Router();

discussionRouter.route("/get-all/").get(async (req, res, next) => {
  try {
    const data = await discussionModel.find({});
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

discussionRouter.route("/post/").post(async (req, res, next) => {
  try {
    await discussionModel.insertMany([req.body]);
    return res.status(200).send("Discussion post successful.");
  } catch (err) {
    return res.status(400).send(err);
  }
});

discussionRouter.route("/put/").put(async (req, res, next) => {
  try {
    const { email, review, rating } = req.body;
    const result = await discussionModel.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { email: email, review: review, rating: rating } },
      { upsert: false, returnNewDocument: true }
    );
    if (result) {
      return res.status(200).send("Discussion updated.");
    }
    console.log(result);
  } catch (err) {
    return res.status(400).send(err);
  }
});

discussionRouter.route("/delete/").delete(async (req, res, next) => {
  try {
    const query = { _id: req.query.id };
    const result = await discussionModel.deleteOne(query);
    if (result.deletedCount === 1) {
      return res.status(200).send("Delete successful.");
    } else {
      return res.status(400).send("Delete unsuccessful.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default discussionRouter;