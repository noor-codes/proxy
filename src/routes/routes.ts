import { Router } from 'express'
import { getGuide } from '@controllers/guideController'
import { healthCheck } from '@controllers/healthController'
import { proxyRequest } from '@controllers/proxyController'

const router = Router()

router.get('/health-check', healthCheck)
router.get('/info', getGuide)
// Handle all HTTP methods for proxy requests
router.all('/:url(*)', proxyRequest)

export default router
