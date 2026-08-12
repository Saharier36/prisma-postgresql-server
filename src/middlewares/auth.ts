import { Request, Response, NextFunction } from "express";
import { verifyToken, IJwtPayload } from "../lib/jwt";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}

export const auth = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "No token provided, authorization denied",
          data: null,
        });
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);

      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action",
          data: null,
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        data: null,
      });
    }
  };
};
