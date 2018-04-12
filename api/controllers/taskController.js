const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const Task = require('../../models/Task');
// const Todo = require('../../models/Todo');

// Create a Task
exports.createTask = (req, res) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        color: req.body.color,
        todos: req.body.todos,
        created: new Date(),
        modified: new Date()
    });
    task.save()
        .then((result) => {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                User.findById(decoded.id)
                    .exec()
                    .then((user) => {
                        user.tasks.push(result);
                        user.save();
                        res.status(201).json({
                            message: `Task created successfully.`,
                            task: {
                                _id: result._id,
                                title: result.title,
                                description: result.description,
                                category: result.category,
                                color: result.color,
                                todos: result.todos,
                                created: result.created,
                                modified: result.modified
                            },
                            request: {
                                type: 'POST',
                                url: 'localhost:5000/api/tasks/'
                            }
                        });
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        res.status(500).json({
                            message: 'Task create failed.',
                            error: error,
                            request: {
                                type: 'POST',
                                url: 'localhost:5000/api/tasks/'
                            }
                        });
                    });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
                res.status(401).json({
                    message: 'Unauthorized.',
                    error: error,
                    request: {
                        type: 'POST',
                        url: 'localhost:5000/api/tasks/'
                    }
                });
            }
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
            res.status(500).json({
                message: 'Task create failed.',
                error: error,
                request: {
                    type: 'POST',
                    url: 'localhost:5000/api/tasks/'
                }
            });
        });
};

// Get Tasks
exports.findTasks = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        User.findById(decoded.id, 'firstName lastName email')
            .populate('tasks')
            .exec((error, result) => {
                if (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    res.status(500).json({
                        message: 'Task search failed.',
                        error: error,
                        request: {
                            type: 'GET',
                            url: 'localhost:5000/api/tasks/'
                        }
                    });
                }
                return res.status(200).json({
                    message: 'Task seacrh succesfull.',
                    result,
                    request: {
                        type: 'GET',
                        url: 'localhost:5000/api/tasks'
                    }
                });
            });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(401).json({
            message: 'Unauthorized.',
            error: error,
            request: {
                type: 'GET',
                url: 'localhost:5000/api/tasks/'
            }
        });
    }
};

// Get Task by ID
exports.findTaskById = (req, res) => {
    const taskID = req.params.taskID;
    Task.findById(taskID).exec((error, result) => {
        if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            return res.status(404).json({
                message: 'Task not found.',
                error: error,
                request: {
                    type: 'GET',
                    url: 'localhost:5000/api/tasks/' + taskID
                }
            });
        }
        if (result === null) {
            return res.status(404).json({
                message: 'Task not found.',
                result,
                request: {
                    type: 'GET',
                    url: 'localhost:5000/api/tasks/' + taskID
                }
            });
        }
        return res.status(200).json({
            message: 'Task found.',
            result,
            request: {
                type: 'GET',
                url: 'localhost:5000/api/tasks' + taskID
            }
        });
    });
};

// Update Task by Id
exports.updateTask = (req, res) => {
    const taskID = req.params.taskID;
    const updatedTask = {
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        color: req.body.color,
        todos: req.body.todos,
        created: req.body.created,
        modified: new Date()
    };
    Task.findByIdAndUpdate(taskID, updatedTask)
        .then(() => {
            return res.status(200).json({
                message: 'Task update success.',
                result: updatedTask,
                request: {
                    type: 'PATCH',
                    url: 'localhost:5000/api/tasks' + taskID
                }
            });
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
            return res.status(500).json({
                message: 'Task update failed.',
                error: error,
                request: {
                    type: 'PATCH',
                    url: 'localhost:5000/api/tasks/' + taskID
                }
            });
        });
};

// Delete Task by Id
exports.deleteTask = (req, res) => {
    const taskID = req.params.taskID;
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        User.findById(decoded.id).exec((error, user) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.log(error);
                return res.status(500).json({
                    message: 'Task delete failed.',
                    error: error,
                    request: {
                        type: 'DELETE',
                        url: 'localhost:5000/api/tasks/' + taskID
                    }
                });
            }
            for (let i = 0; i < user.tasks.length; i += 1) {
                if (user.tasks[i] == taskID) {
                    deleted = true;
                    const task = user.tasks[i];
                    Task.findByIdAndRemove(task).exec((err, result) => {
                        if (err) {
                            // eslint-disable-next-line no-console
                            console.log(err);
                            return res.status(500).json({
                                message: 'Task delete failed.',
                                error: err,
                                request: {
                                    type: 'DELETE',
                                    url: 'localhost:5000/api/tasks/' + taskID
                                }
                            });
                        }
                        user.tasks.splice(i, 1);
                        user.modified = new Date();
                        user.save()
                            .then((modifiedUser) => {
                                return res.status(200).json({
                                    message: 'Task delete success.',
                                    deleted: result,
                                    modifiedUser,
                                    request: {
                                        type: 'DELETE',
                                        url: 'localhost:5000/api/tasks/' + taskID
                                    }
                                });
                            })
                            .catch((error) => {
                                // eslint-disable-next-line no-console
                                console.log(error);
                                return res.status(500).json({
                                    message: 'Task delete failed.',
                                    error: error,
                                    request: {
                                        type: 'DELETE',
                                        url: 'localhost:5000/api/tasks/' + taskID
                                    }
                                });
                            });
                    });
                }
            }
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(401).json({
            message: 'Unauthorized.',
            error: error,
            request: {
                type: 'DELETE',
                url: 'localhost:5000/api/tasks/' + taskID
            }
        });
    }
};
