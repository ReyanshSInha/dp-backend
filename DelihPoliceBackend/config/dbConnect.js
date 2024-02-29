const mongoose = require("mongoose")
require("dotenv").config()

exports.connect = async () => {

    mongoose.connect("mongodb+srv://delhipolice2k22:FvsHa1SKS1xkvzgQ@delhipolice.bzjdiqq.mongodb.net/?retryWrites=true&w=majority&appName=DelhiPolice", 
    // {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    // }
    )
    .then(() => { console.log("DB connected successfully") })
    .catch((error) => {
        console.log("DB connection failed")
        console.error(error)
        process.exit(1)
    })

}