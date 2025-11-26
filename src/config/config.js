import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("ERROR: JWT_SECRET no está definido en .env");
  process.exit(1);
}

export { PORT, NODE_ENV, JWT_SECRET };
