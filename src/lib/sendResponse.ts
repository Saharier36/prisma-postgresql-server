import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: T | null = null,
) => {
  const response: ApiResponse<T> = {
    success,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export default sendResponse;
