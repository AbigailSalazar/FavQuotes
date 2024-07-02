const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require("body-parser")
const { globalErrorHandler, AppError } = require('./utils/appError')
require('dotenv').config({ path: './variables.env' })
const db = require('./config/db');
const userRoutes = require("./routes/userRoutes")

db.connect();

app.use(bodyParser.json());
app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

app.use('/api/users', userRoutes)


app.all('*', (res, req, next) => {
    const error = new AppError(`Path: ${req.originalUrl} doesn't exist`)
    next(error)
})

app.use(globalErrorHandler)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Port listen on port: ${port}`)
})

