const express = require('express');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const todoModel = require('./models/todo');

mongoose.connect('mongodb://localhost:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))

const app = express();

app.use(json());

app.get('/todo', async (req, res) => {
    try {
        const todoItemList = await todoModel.find({});
        res.status(200).json(todoItemList)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

app.post('/todo', async (req, res) => {
    const { body } = req;

    const todoItem = new todoModel(body)

    try {
        const savedTodoItem = await todoItem.save();
        res.status(200).json(savedTodoItem)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

app.get('/todo/:todoId', async (req, res) => {
    const { params } = req;

    try {
        const todoItem = await todoModel.findById(params.todoId);
        res.status(200).json(todoItem)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

app.delete('/todo/:todoId', async (req, res) => {
    const { params } = req;

    try {
        await todoModel.findByIdAndDelete(params.todoId);
        res.status(200).json({
            message: `${params.todoId} is deleted.`
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

app.put('/todo/:todoId', async (req, res) => {
    const { params, body } = req;

    try {
        const updatedRecord = await todoModel.findByIdAndUpdate(params.todoId, { ...body });
        res.status(200).json(updatedRecord)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

app.listen(5000, 'localhost', () => {
    console.log('Server is listening at 5000')
})
