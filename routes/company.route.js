import express from 'express'
import { getCompaniesListByUser, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import isAunthenticated from '../middleware/isAuthenticated.js';


const router = express.Router();

router.route("/register").post(isAunthenticated,registerCompany);
router.route("/getCompaniesListByUser").get(isAunthenticated,getCompaniesListByUser);
router.route("/get/:id").get(isAunthenticated,getCompanyById);
router.route("/update/:id").put(isAunthenticated,updateCompany);

export default router;