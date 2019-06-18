const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');

router.get('/task-list', tasksController.getTasks);
router.post('/add-task', tasksController.postAddTask);

// router.get('/login', authController.getLogin);
router.post('/finish-task', tasksController.postFinishTask);
router.post('/delete-task', tasksController.postDeleteTask);
router.post('/change-priority', tasksController.postChangePriorty);


module.exports = router;