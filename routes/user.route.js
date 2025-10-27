import express from 'express'
import { loginUser, logoutUser, registerUser, updateUserProfile } from '../controllers/user.controller.js';
import isAunthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile/update").post(isAunthenticated,updateUserProfile);

export default router;