import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import s3Routes from "./routes/s3Routes.js";
import path from "path";

//loadings the contens of .env

connectDB();

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Api is running line 12 server");
// });

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/s3", s3Routes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} on port ${PORT} `)
);
