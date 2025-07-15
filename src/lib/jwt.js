import jwt from "jsonwebtoken";
import { serverConfig } from "../config.js";

const { jwtSecret, expiresIn } = serverConfig;

const authService = {
  generateToken: (payload) => jwt.sign(payload, jwtSecret, { expiresIn }),
  verifyToken: (token) => jwt.verify(token, jwtSecret),
};

export default authService;
