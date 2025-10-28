import express from 'express'
import { applyJob, getApplicants, getAppliedJobsOfUser, updateStatus } from '../controllers/application.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router();

router.route('/applyJob/:id').post(isAuthenticated,applyJob);
router.route('/getAppliedJobs').get(isAuthenticated,getAppliedJobsOfUser);
router.route('/:jobId/applicants').get(isAuthenticated, getApplicants);
router.route('/status/:id/update').put(isAuthenticated,updateStatus);

export default router;