import jwt from 'jsonwebtoken';
import { createError } from '../lib/createError.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  // verify the token
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(createError(403, "Invalid or expired token"));
    }
    
    // Store decoded user info
    req.user = payload;
    req.userId = payload.id;

    next();
  });
};
