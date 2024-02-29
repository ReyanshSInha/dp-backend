// imports for token generation
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const User = require("../Models/User")

exports.checkUser = async (req, res) => {

    try{

        const {mobileNumber} = req.body

        if(!mobileNumber){
            return res.status(401).json({
                success: false,
                messsage: "mobileNumber field cannot be empty"
            })
        }

        console.log(mobileNumber)
        const user = await User.findOne({mobileNumber: mobileNumber})

        if(!user){
            return res.status(500).json({
                success: false,
                messsage: "User does not exist try signingup first"
            })
        }

        // creating a payload for the token
        const payload = {
            id: user._id,
            mobileNumber: user.mobileNumber,
            userRole: user.userRole
        }


        console.log("OTP verification successful..")
        let token = jwt.sign(payload, process.env.JWT_SECRET)

        console.log("token creation successful...")            
        console.log("token " + token)

        res.status(200).json({
            success: true,
            user: user,
            token: token,
            message: "User logged in and token sent to the frontend",
        })   

    }catch(err){
        res.status(500).json({
            success: false,
            message: "User cannot be logged in please try again later"
        })
    }
     
}