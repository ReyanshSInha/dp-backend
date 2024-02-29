const User = require("../../Models/User")

exports.getUserProfile = async (req, res) => {

    const {id} = req.params

    const user = await User.findOne({_id: id})

    if(!user){
        res.status(500).json({
            success: false,
            message: "User Does Not Exist"
        })
    }

    res.status(200).json({
        success: true,
        userProfile: user,
        message: "User profile retrieved successfully"
    })
}