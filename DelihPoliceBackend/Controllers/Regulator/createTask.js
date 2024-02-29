// regulator creates the task for the user
const Task = require("../../Models/Task")

exports.createTask = async (req, res) => {
    const {dutyLocation, timeStart, timeEnd, date, userID, attendance} = req.body

    if(!dutyLocation || 
        !timeStart ||
        !timeEnd ||
        !date ||
        !userID ||
        !attendance){
            res.status(500).json({
                success: false,
                fields: {dutyLocation, timeStart, timeEnd, date, userID, attendance},
                message: "all the fields mentioned above must be filled properly"
            })
        }
    
        // if all the fields are filled properly 
        try{
            const task = await Task.create({
                dutyLocation,
                timeStart,
                timeEnd,
                date,
                userID,
                attendance
            })
            console.log(task)

        }catch(e) {
            res.json({
                success: false,
                message: "task creation failed",
                cause: e
            })
        }
        console.log("task assigner")
}
