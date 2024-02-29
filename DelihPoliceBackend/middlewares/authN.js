// we need jwt to decrypt the incomming token
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.authN = async (req, res, next) => {
    try{

        const {token} = req.body
        next()
        if(!token){
            res.status(400).json({
                success: false,
                message: "Token missing - user not logged in"
            })
        }

        // token exists 
        // verify the token and get the payload 
        try {
            
            const payload = jwt.verify(token, ThisIsSuperSecret)
            console.log(payload)
            req.userPayload = payload

        } catch (error) {
            
            res.status(401).json({
                success: false,
                message: "Invalid token"
            })

        }
        next()

    }catch(err){
        res.status(599).json({
            success: false,
            message: "There was an error in authenticating the user - try again later"
        })
    }
}