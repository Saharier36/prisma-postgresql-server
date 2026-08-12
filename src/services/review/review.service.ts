import prisma from "../../lib/prisma";
import { ICreateReviewPayload, IUpdateReviewPayload } from "./review.interface";

// ---------------- CREATE ----------------
const createReview = async (userId: string, payload: ICreateReviewPayload) => {
  const product = await prisma.product.findUnique({
    where: { id: payload.productId },
  });

  if (!product || product.isDeleted) {
    throw new Error("Product not found");
  }

  if (payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const review = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      userId,
      productId: payload.productId,
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      product: { select: { id: true, name: true } },
    },
  });

  return review;
};

// ---------------- GET ALL ----------------
const getAllReviews = async () => {
  const reviews = await prisma.review.findMany({
    where: { isDeleted: false },
    include: {
      user: { select: { id: true, name: true, email: true } },
      product: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews;
};

// ---------------- GET BY ID ----------------
const getReviewById = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      product: { select: { id: true, name: true } },
    },
  });

  if (!review || review.isDeleted) {
    throw new Error("Review not found");
  }

  return review;
};

// ---------------- UPDATE ----------------
const updateReview = async (
  id: string,
  userId: string,
  payload: IUpdateReviewPayload,
) => {
  const existing = await prisma.review.findUnique({ where: { id } });

  if (!existing || existing.isDeleted) {
    throw new Error("Review not found");
  }

  if (existing.userId !== userId) {
    throw new Error("You can only update your own review");
  }

  if (
    payload.rating !== undefined &&
    (payload.rating < 1 || payload.rating > 5)
  ) {
    throw new Error("Rating must be between 1 and 5");
  }

  const updated = await prisma.review.update({
    where: { id },
    data: payload,
  });

  return updated;
};

// ---------------- SOFT DELETE ----------------
const deleteReview = async (id: string, userId: string, userRole: string) => {
  const existing = await prisma.review.findUnique({ where: { id } });

  if (!existing || existing.isDeleted) {
    throw new Error("Review not found");
  }

  // Owner or Admin can delete
  if (existing.userId !== userId && userRole !== "ADMIN") {
    throw new Error("You do not have permission to delete this review");
  }

  const deleted = await prisma.review.update({
    where: { id },
    data: { isDeleted: true },
  });

  return deleted;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
