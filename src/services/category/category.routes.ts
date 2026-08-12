import { Router } from "express";
import { CategoryController } from "./category.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth("ADMIN"), CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.patch("/:id", auth("ADMIN"), CategoryController.updateCategory);
router.delete("/:id", auth("ADMIN"), CategoryController.deleteCategory);

export const CategoryRoutes = router;
