import express from "express";
import { menuModel } from "../models";

const menuRouter = express.Router();

menuRouter.route("/get-all/").get(async (req, res, next) => {
  try {
    const data = await menuModel.find({});
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

menuRouter.route("/post/").post(async (req, res, next) => {
  try {
    await menuModel.insertMany([req.body]);
    return res.status(200).send("menu post successful.");
  } catch (err) {
    return res.status(400).send(err);
  }
});

menuRouter.route("/put/").put(async (req, res, next) => {
  try {
    const { name, description, cost } = req.body;
    const result = await menuModel.findOneAndUpdate(
      { _id: req.query.id },
      { $set: { name: name, description: description, cost: cost } },
      { upsert: true, returnNewDocument: true }
    );
    if (result) {
      return res.status(200).send("menu item updated.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

menuRouter.route("/delete/").delete(async (req, res, next) => {
  try {
    const query = { _id: req.query.id };
    const result = await menuModel.deleteOne(query);
    if (result.deletedCount === 1) {
      return res.status(200).send("Delete successful.");
    } else {
      return res.status(400).send("Delete unsuccessful.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default menuRouter;