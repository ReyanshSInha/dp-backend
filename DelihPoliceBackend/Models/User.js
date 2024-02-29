const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String,
    },

    mobileNumber: {
        type: Number,
    },

    userRole: {
        type: String,
        default: "USER",
        enum: ["USER", "REGULATOR" ]
    }
})

module.exports = mongoose.model("User", UserSchema);

// const User = model("user", TaskSchema)
// module.exports = User;

