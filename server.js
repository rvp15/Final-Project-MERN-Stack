const express = require('express')

const PORT = 5000
require('dotenv').config()
const mongoConfig = require('./config')

const app = express()
app.use(express.json())
//Routes:
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

//Middleware:
app.use('/auth',authRoutes)
app.use('/users',userRoutes)

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
    mongoConfig()
})
