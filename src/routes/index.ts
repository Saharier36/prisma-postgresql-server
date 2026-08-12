import { Router } from "express";
import { UserRoutes } from "../services/user/user.routes";
import { CategoryRoutes } from "../services/category/category.routes";
import { ProductRoutes } from "../services/product/product.routes";
import { ReviewRoutes } from "../services/review/review.routes";
import { OrderRoutes } from "../services/order/order.routes";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/categories", CategoryRoutes);
router.use("/products", ProductRoutes);
router.use("/reviews", ReviewRoutes);
router.use("/orders", OrderRoutes);

export default router;
