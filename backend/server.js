const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const { runUpdateSchedule } = require('./jobs/studioUpdater')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/studios', require('./routes/studioRoutes'))

app.use('/api/capacity', require('./routes/capacityRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

runUpdateSchedule();