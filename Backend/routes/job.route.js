import express from 'express'
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';
import isAunthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route("/postJob").post(isAunthenticated,postJob);
router.route('/getAllJobs').get(isAunthenticated,getAllJobs);
router.route('/getById/:id').get(isAunthenticated,getJobById);
router.route("/getAdminJobs").get(isAunthenticated,getAdminJobs);

export default router;


