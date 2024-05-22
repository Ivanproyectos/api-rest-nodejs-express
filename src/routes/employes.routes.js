import { Router } from 'express'
import { getEmployes, getByIdEmploye, postEmployes, updateEmployes, deleteEmployes } from '../controllers/employes.controller.js'

const router = Router()

router.get('/api/employes', getEmployes)
router.get('/api/employes/:id', getByIdEmploye)
router.post('/api/employes', postEmployes)
router.put('/api/employes', updateEmployes)
router.delete('/api/employes/:id', deleteEmployes)

export default router
