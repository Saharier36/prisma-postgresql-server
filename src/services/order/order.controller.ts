import { Request, Response } from "express";
import { OrderService } from "./order.service";
import sendResponse from "../../lib/sendResponse";

// ---------------- CREATE ----------------
const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const result = await OrderService.createOrder(userId, req.body);
    sendResponse(res, 201, true, "Order created successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create order";
    sendResponse(res, 400, false, message, null);
  }
};

// ---------------- GET ALL ----------------
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrders();
    sendResponse(res, 200, true, "Orders retrieved successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve orders";
    sendResponse(res, 500, false, message, null);
  }
};

// ---------------- GET BY ID ----------------
const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await OrderService.getOrderById(id);
    sendResponse(res, 200, true, "Order retrieved successfully", result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Order not found";
    sendResponse(res, 404, false, message, null);
  }
};

// ---------------- UPDATE STATUS ----------------
const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await OrderService.updateOrderStatus(id, req.body);
    sendResponse(res, 200, true, "Order status updated successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update order status";
    sendResponse(res, 400, false, message, null);
  }
};

// ---------------- DELETE (SOFT) ----------------
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await OrderService.deleteOrder(id);
    sendResponse(res, 200, true, "Order deleted successfully", result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete order";
    sendResponse(res, 400, false, message, null);
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
