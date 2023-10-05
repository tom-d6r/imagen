import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();
const url = process.env.MONGO_URL || "";

connectToDb(url);

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (_req, res) => {
  res.send("Application works!");
});

app.listen(3000, () => {
  console.log("Application started on http://localhost:3000");
});
