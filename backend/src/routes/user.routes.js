import { Router } from "express";
import {
   addAssignee,
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

//secured routes

router
   .route("/login-user-with-access-token")
   .post(verifyJWT, loginUserWithToken);
router.route("/refresh-access-token").post(verifyJWT, refreshAccessToken);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update-profile").put(verifyJWT, updateProfile);
router.route("/add-assignee").post(verifyJWT, addAssignee);

export default router;
