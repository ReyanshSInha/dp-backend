const express = require("express")
const app = express()
require("dotenv").config()
const generateOTP = require("./Controllers/generateOTP")
// this connects us to the external database
require("./config/dbConnect").connect()

// port on which the server is spun
const PORT = 8080;

app.use(express.json())


// importing routes and mounting them
const user = require("./Views/user")

// app. use signifies that all types of request on the route /api/v1 has to go thorugh it
app.use("/api/v1", user)
// checking the generate otp

// this spins up the server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})