

exports.authZ = async (req, res, next) => {
    const {userRole} = req.userPayload
    try {
        if(userRole === "REGULATOR"){
            next()
        }else{
            res.status(500).json({
                success: false,
                message: "user not authorized to access the rpute"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Errpr in authorization - try again later"
        })
    }
    
}