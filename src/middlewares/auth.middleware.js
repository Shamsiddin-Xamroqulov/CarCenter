import jwt from 'jsonwebtoken';
import { serverConfig } from '../config.js';

const { jwtSecret } = serverConfig;

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: 'Token required' });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
