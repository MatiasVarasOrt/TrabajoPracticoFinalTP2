import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

console.log("🔐 JWT_SECRET cargado:", secret);

export function generateToken(payload) {
  if (!secret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export function verifyToken(token) {
  if (!secret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }
  return jwt.verify(token, secret);
}
