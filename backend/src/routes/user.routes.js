import { Router } from "express";
import {
   login,
   loginUserWithToken,
   logoutUser,
   refreshAccessToken,
   register,
   updateProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/login-user-with-access-token").post(loginUserWithToken);

//secured routes

router.route("/refresh-access-token").post(verifyJWT, refreshAccessToken);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("update-profile").patch(verifyJWT, updateProfile);

export default router;
