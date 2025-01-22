import { Router } from 'express'
import { proxyRequest, healthCheck } from '@controllers/proxyController'

const router = Router()

router.get('/health-check', healthCheck)
router.get('/:url(*)', proxyRequest)

export default router
