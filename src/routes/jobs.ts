import { Router } from 'express'
import { createJob, getJobs, getJob } from '../controllers/jobController'
import { authenticate, requireEmployer } from '../middleware/auth'

const router = Router()

router.get('/', getJobs)
router.get('/:id', getJob)
router.post('/', authenticate, requireEmployer, createJob)

export default router