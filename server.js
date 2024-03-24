const express = require("express")
const { errorHandler } = require("./middleware/errorHandler")
const connectDb = require('./config/databaseConnection')
const app =express()
const dotenv=require("dotenv").config()

const port = process.env.PORT || 3003

connectDb()


app.use(express.json())//will pass the data stream that we receive from the client to server side(eg: req.body from postman)

app.use('/api/contacts',require("./routes/contactRoutes"))// using app.use as middleware for our API URL 
app.use('/api/users',require("./routes/userRouter"))
app.use(errorHandler)

app.listen(port,()=>{
    console.log('connection established')
})