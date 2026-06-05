import express from "express";
import dotenv from "dotenv";
import paypalRoutes from "./src/routes/paypalRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(paypalRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "OK", message: "API server is running" });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
