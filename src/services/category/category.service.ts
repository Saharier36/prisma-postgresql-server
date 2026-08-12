import prisma from "../../lib/prisma";
import {
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "./category.interface";

// ---------------- CREATE ----------------
const createCategory = async (payload: ICreateCategoryPayload) => {
  const existing = await prisma.category.findUnique({
    where: { name: payload.name },
  });

  if (existing) {
    throw new Error("Category with this name already exists");
  }

  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

// ---------------- GET ALL ----------------
const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
  });

  return categories;
};

// ---------------- GET BY ID ----------------
const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category || category.isDeleted) {
    throw new Error("Category not found");
  }

  return category;
};

// ---------------- UPDATE ----------------
const updateCategory = async (id: string, payload: IUpdateCategoryPayload) => {
  const existing = await prisma.category.findUnique({ where: { id } });

  if (!existing || existing.isDeleted) {
    throw new Error("Category not found");
  }

  const updated = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return updated;
};

// ---------------- SOFT DELETE ----------------
const deleteCategory = async (id: string) => {
  const existing = await prisma.category.findUnique({ where: { id } });

  if (!existing || existing.isDeleted) {
    throw new Error("Category not found");
  }

  const deleted = await prisma.category.update({
    where: { id },
    data: { isDeleted: true },
  });

  return deleted;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
