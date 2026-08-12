import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/profile", auth(), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    data: req.user,
  });
});

export const UserRoutes = router;
