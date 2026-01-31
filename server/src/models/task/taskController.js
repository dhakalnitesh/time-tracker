
import taskModel from "./taskModel.js";
import {Sequelize} from "sequelize";

class TaskController {
    // Add task route
    async addTask(req, res) {
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

            // const { task, category, time, date } = req.body;

            // // Get userId from token (added by middleware)
            // const userId = req.user.id; // ← THIS is the magic!

            // // Create task with userId from token
            // const data = await taskModel.create({
            //     user_id: userId,  // From token, not from request body
            //     task_name:task,
            //     category,
            //     time_minutes:time,
            //     date
            // });
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
                    date: dateInput,
                },
            });
            return res.json(data);
        } catch (err) { res.json(err) };
    };
    //delete the task
    async deleteTask(req, res) {
        const id = Number(req.params.id || req.query.id);
        console.log(id);
        try {
            if (!id) {
                return res.status(400).json({ message: "Invalid id" });
            }
            const deleted = await taskModel.destroy({
                where: { id }
            });
            if (deleted === 0) {
                return res.status(404).json({ message: "Task not found" });
            }
            return res.status(200).json({ message: "Task deleted successfully" });
        } catch (err) {
            console.error("failed to delete the task", err);
            return res.status(500).json({ error: err.message });
        }
    }
    //displaying the details as per the minutes summary
   async summaryMinutes(req, res) {
    const date = req.params.date || req.query.date;
    // console.log("Date:", date);
    try {
        if (!date) {
            return res.status(400).json({ message: "Please provide the date" });
        }
        const result = await taskModel.findAll({
            attributes: [
                'date',
                [Sequelize.fn('SUM', Sequelize.col('time_minutes')), 'total_minutes']
            ],
            where: { date },
            group: ['date'],
            raw: true
        });
        if (!result.length) {
            return res.status(404).json({ message: "No tasks found for this date" });
        }
        return res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
};
export default TaskController;