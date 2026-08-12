import { Request, Response } from "express";
import { ProductService } from "./product.service";
import sendResponse from "../../lib/sendResponse";

// ---------------- CREATE ----------------
const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.createProduct(req.body);
    sendResponse(res, 201, true, "Product created successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create product";
    sendResponse(res, 400, false, message, null);
  }
};

// ---------------- GET ALL ----------------
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProducts();
    sendResponse(res, 200, true, "Products retrieved successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve products";
    sendResponse(res, 500, false, message, null);
  }
};

// ---------------- GET BY ID ----------------
const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await ProductService.getProductById(id);
    sendResponse(res, 200, true, "Product retrieved successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Product not found";
    sendResponse(res, 404, false, message, null);
  }
};

// ---------------- UPDATE ----------------
const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await ProductService.updateProduct(id, req.body);
    sendResponse(res, 200, true, "Product updated successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update product";
    sendResponse(res, 400, false, message, null);
  }
};

// ---------------- DELETE (SOFT) ----------------
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await ProductService.deleteProduct(id);
    sendResponse(res, 200, true, "Product deleted successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete product";
    sendResponse(res, 400, false, message, null);
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
