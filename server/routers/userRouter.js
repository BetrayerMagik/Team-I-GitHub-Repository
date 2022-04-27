import express from "express";
import expressAsyncHandler from "express-async-handler";
import { userModel } from "../models";

const userRouter = express.Router();

userRouter.route("/signin/").post(async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).send("No matching user found.");
    } else {
      if (user.password !== req.body.password) {
        return res.status(400).send("Incorrect email or password");
      }
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.route("/signup/").post(async (req, res, next) => {
  // Check if this user already exisits
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    // Insert the new user if they do not exist yet
    user = new userModel({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      role: req.body.role,
      money: req.body.money,
    });
    await user.save();
    res.send(user);
  }
});
userRouter.route("/put-warning/").put(async (req, res, next) => {
  try {
    if (req.body.role === "vip") {
      if (req.body.warning > 2) {
        console.log("convert");
        await userModel.findOneAndUpdate(
          { email: req.body.email },
          { $set: { role: "regular", warning: 0 } },
          { upsert: true, returnNewDocument: true }
        );
        return res.status(200).send("Role converted to regular.");
      }
    } else if (req.body.role === "regular") {
      if (req.body.warning > 3) {
        console.log("dereg");
        await userModel.findOneAndUpdate(
          { email: req.body.email },
          { $set: { registered: false } },
          { upsert: true, returnNewDocument: true }
        );
        return res.status(200).send("Deregistered.");
      }
    }

    const result = await userModel.findOneAndUpdate(
      { email: req.body.email },
      { $set: { warning: req.body.warning } },
      { upsert: true, returnNewDocument: true }
    );
    if (result) {
      return res.status(200).send("warning updated.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});
// userRouter.route("/put-warning/").put(async (req, res, next) => {
//   try {
//     // const { name, description, cost } = req.body;
//     const result = await userModel.findOneAndUpdate(
//       { email: req.body.email },
//       { $set: { warning: req.body.warning } },
//       { upsert: true, returnNewDocument: true }
//     );
//     if (result) {
//       return res.status(200).send("warning updated.");
//     }
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// });

userRouter.route("/put-balance/").put(async (req, res, next) => {
  try {
    // const { name, description, cost } = req.body;
    const result = await userModel.findOneAndUpdate(
      // { _id: req.body.id },
      { _id: req.body.id },
      { $set: { money: req.body.money } },
      { upsert: true, returnNewDocument: true }
    );
    if (result) {
      return res.status(200).send("balance updated.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.route("/blacklist/").put(async (req, res, next) => {
  try {
    // const { name, description, cost } = req.body;
    const result = await userModel.findOneAndUpdate(
      // { _id: req.body.id },
      { _id: req.body.id },
      { $set: { blacklisted: req.body.blacklist } },
      { upsert: true, returnNewDocument: true }
    );
    if (result) {
      return res.status(200).send("blacklist updated.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.route("/register/").put(async (req, res, next) => {
  try {
    // const { name, description, cost } = req.body;
    const result = await userModel.findOneAndUpdate(
      // { _id: req.body.id },
      { _id: req.body.id },
      { $set: { registered: req.body.register } },
      { upsert: true, returnNewDocument: true }
    );
    if (result) {
      return res.status(200).send("register updated.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.route("/post-order/").put(async (req, res, next) => {
  userModel.exists({ _id: req.body.id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      if (result) {
        userModel.findOneAndUpdate(
          { _id: req.body.id },
          { $push: { orders: req.body.orders } },
          // { upsert: true, new: true, setDefaultsOnInsert: true },

          (err, result) => {
            if (err) return res.status(400).send(err);
            else return res.status(200).send("success");
          }
        );
      } else {
        try {
          const newUser = new foodHistoryModel(req.body);
          newUser.save();
        } catch (err) {
          return res.status(450).send(err.stack);
        }
      }
    }
  });
});

userRouter.route("/get-user/").post(async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).send("No matching user found.");
    }
    //  else {
    //   if (user.password !== req.body.password) {
    //     return res.status(400).send("Incorrect email or password");
    //   }
    // }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.route("/get-all/").get(async (req, res, next) => {
  try {
    const data = await userModel.find({});
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.route("/put/").put(async (req, res, next) => {
  try {
    await userModel.findOneAndUpdate({ email: req.query.email }, req.body, {
      new: true,
      upsert: true,
    });
    return res.status(200).send("User modification successful. ");
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default userRouter;