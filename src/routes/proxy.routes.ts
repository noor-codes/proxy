import { Router } from 'express'
import { proxyRequest, healthCheck } from '@controllers/proxyController'

const router = Router()

router.get('/:url(*)', proxyRequest)
router.get('/health-check', healthCheck)

export default router
