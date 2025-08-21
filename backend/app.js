import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import { requireAuth, requireRole } from "./middleware/authMiddleware.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/ping", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() as currentTime");
    res.json({ message: "DB Connected!", time: rows[0].currentTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);

app.use(
  "/api/bases",
  requireAuth,
  requireRole("ADMIN", "COMMANDER"),
  baseRoutes
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port http://localhost:${PORT}`);
});
