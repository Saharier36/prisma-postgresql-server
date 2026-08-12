import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import sendResponse from "../../lib/sendResponse";

// ---------------- CREATE ----------------
const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const result = await ReviewService.createReview(userId, req.body);
    sendResponse(res, 201, true, "Review created successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create review";
    sendResponse(res, 400, false, message, null);
  }
};

// ---------------- GET ALL ----------------
const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getAllReviews();
    sendResponse(res, 200, true, "Reviews retrieved successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve reviews";
    sendResponse(res, 500, false, message, null);
  }
};

// ---------------- GET BY ID ----------------
const getReviewById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await ReviewService.getReviewById(id);
    sendResponse(res, 200, true, "Review retrieved successfully", result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Review not found";
    sendResponse(res, 404, false, message, null);
  }
};

// ---------------- UPDATE ----------------
const updateReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = req.user!.userId;
    const result = await ReviewService.updateReview(id, userId, req.body);
    sendResponse(res, 200, true, "Review updated successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update review";
    sendResponse(res, 400, false, message, null);
  }
};

// ---------------- DELETE (SOFT) ----------------
const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = req.user!.userId;
    const userRole = req.user!.role;
    const result = await ReviewService.deleteReview(id, userId, userRole);
    sendResponse(res, 200, true, "Review deleted successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete review";
    sendResponse(res, 400, false, message, null);
  }
};

export const ReviewController = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
