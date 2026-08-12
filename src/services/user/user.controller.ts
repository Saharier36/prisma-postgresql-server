import { Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../lib/sendResponse";

// ---------------- REGISTER ----------------
const register = async (req: Request, res: Response) => {
  try {
    const result = await UserService.registerUser(req.body);
    sendResponse(res, 201, true, "User registered successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    sendResponse(res, 400, false, message, null);
  }
};

// ---------------- LOGIN ----------------
const login = async (req: Request, res: Response) => {
  try {
    const result = await UserService.loginUser(req.body);
    sendResponse(res, 200, true, "Login successful", result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    sendResponse(res, 401, false, message, null);
  }
};

export const UserController = {
  register,
  login,
};
