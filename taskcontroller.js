import Task from "../models/Task.js";

export const createTask = async (req, res) => {

  const task = await Task.create({
    title: req.body.title,
    user: req.user
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {

  const tasks = await Task.find({ user: req.user });

  res.json(tasks);
};

export const deleteTask = async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await task.deleteOne();

  res.json({ message: "Task deleted" });
};