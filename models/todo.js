const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: String,
    completed: {
        type: Boolean,
        default: false
    }
})

const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;
