import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./schema/UserSchema.js";
import { sendMailToUser } from "./sendMail.js";
const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`Mongo Connected`);
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(express.json());

app.post("/user-form", async (req, res) => {
  try {
    const data = req.body;
    const formData = await User.create(data);
    sendMailToUser(
      req.body.email,
      "Welcome! Thanks for registartion.",
      `<div>Hi ${req.body.name},</div><p>Welcome! ${req.body.email}. Registration Success!!!</p>`
    );
    res.status(200).send(formData);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/get-user-form", async (req, res) => {
  try {
    const allForms = await User.find().sort({ _id: -1 });
    res.status(200).send(allForms);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, (req, res) => {
  console.log(`Listening on ${port}`);
});
