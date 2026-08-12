import { Router } from "express";
import { UserRoutes } from "../services/user/user.routes";
import { CategoryRoutes } from "../services/category/category.routes";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/categories", CategoryRoutes);

export default router;
