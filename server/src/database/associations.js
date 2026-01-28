import Task from "../models/task/taskModel.js";
import User from "../models/user/userModel.js";

User.hasMany(Task, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Task.belongsTo(User, {
  foreignKey: 'user_id',
});



// like the below code 

// app.post('/tasks', authMiddleware, async (req, res) => {
//   const userId = req.user.id; // from token

//   const task = await Task.create({
//     ...req.body,
//     userId,
//   });

//   res.json(task);
// });
