import { Router } from "express";
import { UserRoutes } from "../services/user/user.routes";
import { CategoryRoutes } from "../services/category/category.routes";
import { ProductRoutes } from "../services/product/product.routes";
import { ReviewRoutes } from "../services/review/review.routes";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/categories", CategoryRoutes);
router.use("/products", ProductRoutes);
router.use("/reviews", ReviewRoutes);

export default router;
