import { Router } from 'express'
import { applyToJob, getMyApplications } from '../controllers/applicationController'
import { authenticate, requireEmployer } from '../middleware/auth'

const router = Router()

router.post('/jobs/:id/apply', authenticate, applyToJob)
router.get('/my-applications', authenticate, getMyApplications)

export default router