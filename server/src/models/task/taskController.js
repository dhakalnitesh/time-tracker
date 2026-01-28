
import taskModel from "./taskModel.js";

class TaskController {
    // Add task route
    async task(req, res) {
        try {
            const { task_name, category, time_minutes, date } = req.body;

            // Get userId from token (added by middleware)
            const userId = req.user.id; // ← THIS is the magic!

            // Create task with userId from token
            const task = await taskModel.create({
                user_id: userId,  // From token, not from request body
                task_name,
                category,
                time_minutes,
                date
            });
            res.status(201).json({
                message: 'Task created',
                task
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    };
    //get task
    async getTask(req, res) {
        const user_id = req.user.id;
        try {
            if (user_id) {
                const data = await taskModel.findAll();
                return res.json(data);
            }
            else {
                res.json("Failed to load the data");
            }
        } catch (err) {
            res.json({ message: err.message });
        }
    }

    //search the task by date
    async getTaskByDate(req, res) {
        const { dateInput } = req.query;
        try {
                const data = await taskModel.findAll({
                    where: {
                        user_id: req.user.id,
                        date:dateInput,
                    },
                });
                return res.json(data);
        

        } catch (err) {res.json(err) };

    }
};

export default TaskController;