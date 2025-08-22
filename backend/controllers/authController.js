import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1d",
  });

export const register = async (req, res) => {
  try {
    const { username, password, role, base_id } = req.body;

    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ error: "username, password, and role are required" });
    }
    if (!["ADMIN", "COMMANDER", "LOGISTICS"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const [exists] = await db.query("SELECT id FROM users WHERE username = ?", [
      username,
    ]);
    if (exists.length)
      return res.status(409).json({ error: "Username already exists" });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (username, password, role, base_id) VALUES (?, ?, ?, ?)",
      [username, hash, role, base_id ?? null]
    );

    res.status(201).json({
      id: result.insertId,
      username,
      role,
      base_id: base_id ?? null,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log("🟢 Login attempt:", username, role);

    // 1. Find user
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (!rows.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    // 2. Check password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Check role
    if (role && user.role !== role) {
      return res.status(401).json({ error: "Role mismatch" });
    }

    // 4. Create token
    const token = signToken({
      id: user.id,
      role: user.role,
      base_id: user.base_id,
    });

    // 5. Send response
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        base_id: user.base_id,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};
