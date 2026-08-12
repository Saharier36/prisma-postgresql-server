import { Router } from "express";
import { ReviewController } from "./review.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth(), ReviewController.createReview);
router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);
router.patch("/:id", auth(), ReviewController.updateReview);
router.delete("/:id", auth(), ReviewController.deleteReview);

export const ReviewRoutes = router;
