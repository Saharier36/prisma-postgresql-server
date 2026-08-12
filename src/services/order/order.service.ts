import prisma from "../../lib/prisma";
import {
  ICreateOrderPayload,
  IUpdateOrderStatusPayload,
} from "./order.interface";

// ---------------- CREATE ----------------
const createOrder = async (userId: string, payload: ICreateOrderPayload) => {
  if (!payload.items || payload.items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  const order = await prisma.$transaction(async (tx) => {
    let totalAmount = 0;
    const orderItemsData: {
      productId: string;
      quantity: number;
      price: number;
    }[] = [];

    // Validate each product and calculate total
    for (const item of payload.items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || product.isDeleted) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      totalAmount += product.price * item.quantity;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });

      // Decrease stock
      await tx.product.update({
        where: { id: product.id },
        data: { stock: product.stock - item.quantity },
      });
    }

    // Create order with nested order items
    const newOrder = await tx.order.create({
      data: {
        userId,
        totalAmount,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });

    return newOrder;
  });

  return order;
};

// ---------------- GET ALL ----------------
const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    where: { isDeleted: false },
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return orders;
};

// ---------------- GET BY ID ----------------
const getOrderById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: { include: { product: true } },
    },
  });

  if (!order || order.isDeleted) {
    throw new Error("Order not found");
  }

  return order;
};

// ---------------- UPDATE STATUS ----------------
const updateOrderStatus = async (
  id: string,
  payload: IUpdateOrderStatusPayload,
) => {
  const existing = await prisma.order.findUnique({ where: { id } });

  if (!existing || existing.isDeleted) {
    throw new Error("Order not found");
  }

  const updated = await prisma.order.update({
    where: { id },
    data: { status: payload.status },
  });

  return updated;
};

// ---------------- SOFT DELETE ----------------
const deleteOrder = async (id: string) => {
  const existing = await prisma.order.findUnique({ where: { id } });

  if (!existing || existing.isDeleted) {
    throw new Error("Order not found");
  }

  const deleted = await prisma.order.update({
    where: { id },
    data: { isDeleted: true },
  });

  return deleted;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
