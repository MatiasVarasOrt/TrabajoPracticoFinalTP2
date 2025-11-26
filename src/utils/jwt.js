import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

console.log("🔐 JWT_SECRET cargado:", JWT_SECRET);

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
