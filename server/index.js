import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Images from "./imageDetails.js";
import cors from "cors";

const app = express();

//middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//dot env config
dotenv.config();

//db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listning on port ${process.env.PORT}`)
    )
  )
  .catch((error) => {
    console.log(error);
  });

app.use(cors());

//api

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;

  try {
    const im = await Images.create({ Image: base64 });
    res.send(im._id);
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});

app.get("/get-image/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Images.findById(id).then((data) => {
      res.send({ Status: "ok", data: data });
    });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});
//
