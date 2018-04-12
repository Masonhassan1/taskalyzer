const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const checkAuth = require('../middlewares/check-auth');

router.post('/', checkAuth, taskController.createTask);

router.get('/', checkAuth, taskController.findTasks);

router.get('/:taskID', checkAuth, taskController.findTaskById);

router.patch('/:taskID', checkAuth, taskController.updateTask);

router.delete('/:taskID', checkAuth, taskController.deleteTask);

module.exports = router;
