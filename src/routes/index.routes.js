import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('MI API RES CON EXPRESS!')
})

export default router
