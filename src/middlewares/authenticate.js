import { verifyToken } from "../utils/jwt.js";

export default function authenticate(req, res, next) {
  try {
    const token = req.cookies?.payload;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    // decodifica el JWT
    const user = verifyToken(token);

    if (!user || !user.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
}
