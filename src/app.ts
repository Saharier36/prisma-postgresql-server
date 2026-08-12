import express, { Application, Request, Response } from "express";
import cors from "cors";
import prisma from "./lib/prisma";
import mainRouter from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
    data: null,
  });
});

// Main API routes
app.use("/api", mainRouter);

// Temporary test route
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const userCount = await prisma.user.count();
    res.status(200).json({
      success: true,
      message: "Database connected successfully",
      data: { userCount },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      data: error instanceof Error ? error.message : error,
    });
  }
});

export default app;
