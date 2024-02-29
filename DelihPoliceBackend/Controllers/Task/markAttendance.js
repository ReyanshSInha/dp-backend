// logic to calculate distance
// Function to calculate the distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to check if a point is within a certain distance (e.g., 5 km) of another point
function isWithinDistance(lat1, lon1, lat2, lon2, distance) {
    const calculatedDistance = calculateDistance(lat1, lon1, lat2, lon2);
    return calculatedDistance <= distance;
}

const { findOneAndUpdate } = require("../../Models/Admin");
const Task = require("../../Models/Task")


exports.markAttendance = async (req, res) => {

    try{
    const {longitude, latitude} = req.body
    const taskID = req.params.id

    const task = await Task.findOne({_id: taskID})

    const point1 = {latitude: task.latitude, longitude: task.longitude}
    
    const point2 = { latitude: latitude, longitude: longitude };

    const presentDistance = 1000

    const present = isWithinDistance(
        point1.latitude, 
        point1.longitude, 
        point2.latitude, 
        point2.longitude, 
        presentDistance
    )
        if(present){
            task.attendance = true
        }

        const markedAttendance = await findOneAndUpdate(taskID, task, {new: true})

        res.status(200).json({
            success: true,
            markedAttendance: markedAttendance,
            message: "Attendance Marked Successfully!!!"
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Attendance could not be marked try again later..."
        })
    }
}