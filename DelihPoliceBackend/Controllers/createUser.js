const User = require("../Models/User")
require("dotenv").config()
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    try{

        // getting data from request body 
        const {firstName, lastName, mobileNumber, userRole} = req.body
        var token
        // console.log(userRole)
        // check if any of the input field is empty or not 
        if(!firstName || !lastName || !mobileNumber || !userRole){
            return res.status(400).json({
                success: false,
                message: "All the fields must be filled properly"
            })
        }

        // check if the user already exist - (interact with the database using the User model)
        console.log(mobileNumber)
        const existingUser = await User.findOne({mobileNumber}, {new: true})
        // console.log/("existing user-")
        if(existingUser){
            console.log("number " + existingUser)

            return res.status(400).json({
                success: false,
                message: "User already exist try logging in..."
            })
        }

        // userCreation 
        console.log("user creation Started")
            try{
                const user = await User.create({
                    firstName,
                    lastName,
                    mobileNumber,
                    userRole
                })
                console.log(user)

                // creating a payload for the token
                const payload = {
                    id: user._id,
                    userRole: user.userRole
                }
                console.log("token creation started")
                token = jwt.sign(payload, process.env.JWT_SECRET)

                console.log("token creation successful...")            
                console.log("token " + token)

            }catch(e) {
                return res.json({
                    success: false,
                    message: "user creation failed",
                    cause: e
                })
            }
            console.log("user Created")

            // generating token for user
            
            return res.status(200).json({
                success: true,
                token: token,
                message: `User created successfully`
            })

    }catch(err){
        return res.json({
            success: false,
            message: "user creation failed",
            cause: err
        })
    }
}