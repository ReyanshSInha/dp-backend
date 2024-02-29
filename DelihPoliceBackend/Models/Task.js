const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    DutyLocation:{
        type:String,
        require:true,
    },
    PatrolingTimeStart:{
        type:String,
        require:true,
    },
    PatrolingTimeEnd:{
        type:String,
        require:true,
    },
    PatrolingTimeMid:{
        type:String,
        require:true,
    },
    Status:{
        type:String,
        enum:["Active", "completed"],
        default:"Active",
    },
    CompletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:'User',

    },
    Date:{
        type:Date,
        require:true,
    },
    Attendance:{
        type:String,
        enum:["Present", "Absent"],
    },
    latitude:{
       type:Number,
       require:true,
    },
    longitute:{
        type:Number,
        require:true,
    },
    
})
module.exports = mongoose.model("Task", TaskSchema);

// const Task = model("task", TaskSchema)
// module.exports = Task;