const mongoose = require('mongoose');
const Todo = require('./Todo').schema;
const Schema = mongoose.Schema;

// Task Schema Model
const taskSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    color: {
        type: String,
        default: 'bg-default'
    },
    todos: {
        type: [Todo]
    },
    created: {
        type: Date,
        required: true
    },
    modified: {
        type: Date,
        required: true
    }
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;
