const Task = require('../models/task');

exports.getTasks = async (req, res, next) => {

  if(req.user) {
    const tasks = await Task.find({ userId: req.user._id });
    res.render('tasks/task-list', {
      pageTitle: "Todo list",
      path:"/task-list",
      tasks,
      isLoggedIn: req.session.isLoggedIn
    });
  }
  res.redirect('/login');
}
exports.postAddTask = async (req, res, next) => {
  const content = req.body.content;

  const task = new Task({
    content,
    userId: req.user._id
  });

  await task.save();

  res.redirect('/tasks/task-list');
}
exports.postFinishTask = async (req, res, next) => {
  const taskId = req.body.taskId;
  
  const task = await Task.findById(taskId);

  if (task.status === 'new') {
    task.status = 'finished';
  } else if (task.status === 'finished') {
    task.status = 'new';
  }
  await task.save();
  res.redirect('/tasks/task-list');
}
exports.postDeleteTask = async (req, res, next) => {
  const taskId = req.body.taskId;
  
  await Task.findOneAndDelete(taskId);
  res.redirect('/tasks/task-list');
}

exports.postChangePriorty = async (req, res, next) => {
  const taskId = req.body.taskId;
  const priorityValue = req.body.priorityValue;
  const task = await Task.findById(taskId);
  console.log(priorityValue);
  switch (priorityValue){
    case "1":
    task.priority = 'low'
    break;
    case "2":
    task.priority = 'medium'
    break;
    case "3":
    task.priority = 'high'
    break;
  }
  await task.save();
  res.redirect('/tasks/task-list');
}