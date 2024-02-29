const User = require("../../Models/User")
const Task = require("../../Models/Task")

exports.completedTask = async (req, res) => {
    const userID = req.userPayload.userID
    const user = await User.find({_id:userID})
    const completedTask = user.completedTask
    completedTask.forEach(element => {
        //console.log(element)
        const completedTaskID = Task.find({_id:element});
        console.log(completedTaskID);
    });
    
}