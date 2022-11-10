const express = require('express')

const PORT = 5000
require('dotenv').config()
const mongoConfig = require('./config')
const { authorizeUser } = require('./middlewareAuth/authMiddleware')
const cookieParser = require ('cookie-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
//Routes:
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

//Middleware:
app.use('/auth',authRoutes)
app.use('/user',authorizeUser,userRoutes)

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
    mongoConfig()
})
