import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import jobRoutes from './routes/jobs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Job Board API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app