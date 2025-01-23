import { Router } from 'express'
import { proxyRequest, healthCheck } from '@controllers/proxyController'

const router = Router()

router.get('/health-check', healthCheck)
// Handle all HTTP methods for proxy requests
router.all('/:url(*)', proxyRequest)

export default router
