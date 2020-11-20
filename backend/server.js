import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import s3Routes from "./routes/s3Routes.js";



//loadings the contens of .env

connectDB();

console.log(process.env.ACCESS_KEY_ID) 

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running line 12 server"); 
});

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/s3", s3Routes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} on port ${PORT} `)
);
