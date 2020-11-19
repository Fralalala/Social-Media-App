import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import dotenv from "dotenv";

import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { v4 as uuid } from "uuid";
import fs from "fs";

import { makePost } from "./controller/postController.js";

//loadings the contens of .env
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running line 12 server");
});

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

//for some reason, placing them on a different file will make certain errors
//in uploading

// #region S3

let cred = new aws.Credentials({
  accessKeyId: aki,
  secretAccessKey: sak,
});
const s3 = new aws.S3({ apiVersion: "2006-03-01", credentials: cred });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "socmedbucket2",
    metadata: (req, res, callback) => {
      callback(null, { fieldName: res.fieldname });
    },
    key: (req, res, callback) => {
      const ext = path.extname(res.originalname);
      callback(null, `${uuid()}${ext}`);
    },
    credentials: cred,
  }),
});

//#endregion
app.post("/api/upload", upload.single("image"), (req, res) => {
  return res.json({
    status: "File is uploaded",
    imgSrc: req.file.location,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} on port ${PORT} `)
);
