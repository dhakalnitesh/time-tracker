
import taskModel from "./taskModel.js";
import { Sequelize } from "sequelize";
class TaskController {
    // Add task route
    async addTask(req, res) {
        try {
            const { task_name, category, time_minutes, date } = req.body;
            const userId = req.user.id;
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
                const { count, rows } = await taskModel.findAndCountAll();
                return res.json({ count, tasks: rows });
            }
            else {
                res.json("Failed to load the data");
            }
        } catch (err) {
            res.json({ message: err.message });
        }
    };
    //search the task by date
    async getTaskByDate(req, res) {
        const dateInput = req.params.date || req.query;
        // OR. Date doesnot come here at object
        // const dateInput = req.query;
        console.log(dateInput)
        try {
            const { count, rows } = await taskModel.findAndCountAll({
                where: {
                    user_id: req.user.id,
                    date: dateInput,
                },
            });
            return res.json({ count, tasks: rows });
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
    };
//update task
// Simple editTask using Sequelize (the AI generated code)
async editTask(req, res) {
  const id = req.params.id || req.query.id;   // get task id
  const updateData = req.body;                // get updated fields

  if (!id) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    // Update the task
    const [updatedCount] = await taskModel.update(updateData, { where: { id } });

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Task not found or nothing changed" });
    }

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    console.error("Update failed:", err);
    return res.status(500).json({ error: err.message });
  }
}
    //displaying the details as per the minutes summary
    async summaryMinutes(req, res) {
        const date = req.params.date || req.query.date;
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
            return res.json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }
};
export default TaskController;