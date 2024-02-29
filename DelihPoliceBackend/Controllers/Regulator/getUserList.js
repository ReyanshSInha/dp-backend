// gives the list of all the users
const User = require("../../Models/User")

exports.getUserList = async (req, res) => {
    
    try{
        const userData = await User.find({})

        if(!userData){
            res.status(500).json({
                success: false,
                message: "No user data available"
            })
        }else{
            res.status(200).json({
                status: true,
                userData: userData,
                message: "User Data retrieved successfully"
            })
        }

    }catch(e){
        res.status(400).json({
            success: false,
            error: e,
            message: "user data retrival failed - try again later"
        })
    }
   

    

}