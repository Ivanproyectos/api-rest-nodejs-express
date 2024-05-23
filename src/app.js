import express from 'express'
import employesRoutes from './routes/employes.routes.js'
import indexRoutes from './routes/index.routes.js'
import './config.js'

const app = express()

app.use(express.json())
app.get('/ping', (req, res) => res.send('pong'))
app.use(indexRoutes)
app.use(employesRoutes)
app.use((req, res, next) => {
  res.status(404).send('enpoint not found')
  next()
})

export default app
