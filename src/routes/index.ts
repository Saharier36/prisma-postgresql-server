import { Router } from "express";
import { UserRoutes } from "../services/user/user.routes";

const router = Router();

router.use("/auth", UserRoutes);

export default router;
