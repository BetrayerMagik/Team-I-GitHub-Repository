import cors from "cors"
import dotenv from "dotenv"
import express from "express"
// import { application } from "express";
import mongoose from "mongoose"
import {
    userRouter, orderRouter, menuRouter, memoRouter, discussionRouter
} from "./routers"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB Connection
mongoose.connect(
    "mongodb+srv://admin:Abcd123$@cluster0.ptizz.mongodb.net/delimeal?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        autoIndex: false, //dont build indexes
        maxPoolSize: 10, //maitain up tp 10 socket connection
        serverSelectionTimeoutMS: 5000, //keep trying to send operation for 5 seconds
        socketTimeoutMS: 45000, //Close sockets after 45 seconds of inactivity
        family: 4, //use IPv4, skip trying IPv6
    }
);

// API endpoints

app.get("/", (req, res) => {
    res.send("Server is Ready");

})

app.use("/user/", userRouter);
app.use("/order/", orderRouter);
app.use("/menu/", menuRouter);
app.use("/memo/", memoRouter);
app.use("/discussion/", discussionRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server stated at http://localhost:${port}`)
});