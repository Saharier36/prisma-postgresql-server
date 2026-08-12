import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import sendResponse from "../../lib/sendResponse";

// ---------------- CREATE ----------------
const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    sendResponse(res, 201, true, "Category created successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create category";
    sendResponse(res, 400, false, message, null);
  }
};

// ---------------- GET ALL ----------------
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.getAllCategories();
    sendResponse(res, 200, true, "Categories retrieved successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve categories";
    sendResponse(res, 500, false, message, null);
  }
};

// ---------------- GET BY ID ----------------
const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await CategoryService.getCategoryById(id);
    sendResponse(res, 200, true, "Category retrieved successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Category not found";
    sendResponse(res, 404, false, message, null);
  }
};

// ---------------- UPDATE ----------------
const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await CategoryService.updateCategory(id, req.body);
    sendResponse(res, 200, true, "Category updated successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update category";
    sendResponse(res, 400, false, message, null);
  }
};

// ---------------- DELETE (SOFT) ----------------
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await CategoryService.deleteCategory(id);
    sendResponse(res, 200, true, "Category deleted successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete category";
    sendResponse(res, 400, false, message, null);
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
