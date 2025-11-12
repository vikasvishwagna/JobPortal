import express from 'express'
import { getCompaniesListByUser, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import isAunthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';


const router = express.Router();

router.route("/register").post(isAunthenticated,registerCompany);
router.route("/getCompaniesListByUser").get(isAunthenticated,getCompaniesListByUser);
router.route("/get/:id").get(isAunthenticated,getCompanyById);
router.route("/update/:id").put(isAunthenticated,singleUpload,updateCompany);

export default router;