import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing Bearer token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid/expired token" });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthenticated" });
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden: insufficient role" });
  }
  next();
};

export const restrictToOwnBase = (req, res, next) => {
  if (req.user.role === "ADMIN") return next();

  const targetBaseId = Number(req.params.baseId || req.body.base_id || req.query.base_id);
  if (!targetBaseId) return res.status(400).json({ error: "base_id is required" });

  if (req.user.base_id !== targetBaseId) {
    return res.status(403).json({ error: "Forbidden: not your base" });
  }
  next();
};
