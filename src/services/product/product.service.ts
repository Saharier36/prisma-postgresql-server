import prisma from "../../lib/prisma";
import {
  ICreateProductPayload,
  IUpdateProductPayload,
} from "./product.interface";

// ---------------- CREATE ----------------
const createProduct = async (payload: ICreateProductPayload) => {
  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });

  if (!category || category.isDeleted) {
    throw new Error("Category not found");
  }

  const product = await prisma.product.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      stock: payload.stock ?? 0,
      categoryId: payload.categoryId,
    },
    include: { category: true },
  });

  return product;
};

// ---------------- GET ALL ----------------
const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    where: { isDeleted: false },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return products;
};

// ---------------- GET BY ID ----------------
const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, reviews: true },
  });

  if (!product || product.isDeleted) {
    throw new Error("Product not found");
  }

  return product;
};

// ---------------- UPDATE ----------------
const updateProduct = async (id: string, payload: IUpdateProductPayload) => {
  const existing = await prisma.product.findUnique({ where: { id } });

  if (!existing || existing.isDeleted) {
    throw new Error("Product not found");
  }

  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: payload.categoryId },
    });
    if (!category || category.isDeleted) {
      throw new Error("Category not found");
    }
  }

  const updated = await prisma.product.update({
    where: { id },
    data: payload,
    include: { category: true },
  });

  return updated;
};

// ---------------- SOFT DELETE ----------------
const deleteProduct = async (id: string) => {
  const existing = await prisma.product.findUnique({ where: { id } });

  if (!existing || existing.isDeleted) {
    throw new Error("Product not found");
  }

  const deleted = await prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });

  return deleted;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
