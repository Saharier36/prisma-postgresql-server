import { Router } from "express";
import { UserRoutes } from "../services/user/user.routes";
import { CategoryRoutes } from "../services/category/category.routes";
import { ProductRoutes } from "../services/product/product.routes";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/categories", CategoryRoutes);
router.use("/products", ProductRoutes);

export default router;
