import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port: ${process.env.PORT}`);
});
