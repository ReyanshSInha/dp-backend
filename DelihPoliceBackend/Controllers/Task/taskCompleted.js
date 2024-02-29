
const User = require("../../Models/User");
const Task = require("../../Models/Task");

exports.taskCompleted = async (req, res) => {
  try {
    const userID = req.userPayload.userID;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const activeTasks = user.ActiveTask;

    for (const taskId of activeTasks) {
      const taskData = await Task.findById(taskId);

      if (taskData) {
        // Update the task status to "completed"
        taskData.Status = "completed";
        // Update the CompletedBy field to the user's ID
        taskData.CompletedBy = userID;
        await taskData.save();

        // Move the task from ActiveTask to CompletedTask in the user document
        user.CompletedTask.push(taskId);
        user.ActiveTask = user.ActiveTask.filter(taskId => taskId.toString() !== taskData._id.toString());
      }
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Active tasks updated successfully" });
  } catch (error) {
    console.error("Error updating active tasks:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

