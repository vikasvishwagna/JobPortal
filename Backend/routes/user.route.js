import express from 'express'
import { loginUser, logoutUser, registerUser, updateUserProfile } from '../controllers/user.controller.js';
import isAunthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(singleUpload,registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/profile/update").post(isAunthenticated,singleUpload,updateUserProfile);

export default router;