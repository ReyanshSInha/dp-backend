const User = require("../../Models/User");
const Task = require("../../Models/Task");

    exports.activeTask = async (req, res) => {
        try{
            const userID = req.userPayload.userID
            const user = await User.find({_id: userID})
            if(!user){
                return res.status(401).json({
                    success: false,
                    messsage: "User does not exist"
                })
            }

            const activeTask = user.ActiveTask

            activeTask.foreach(async (element)=> {
            const taskData = await Task.find({_id: element});
            console.log(taskData);
            res.status(200).json({
                taskData:taskData,
                message: "Task data of active user received",
            })  
         })
 
    
        }catch(err){
            res.status(500).json({
                success: false,
                message: "Active user not found"
            })
        }
    };