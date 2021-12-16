const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../todoSchemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);




//get all the todo
router.get('/', async (req, res) => {
    await Todo.find().select({ __v: 0 }).exec((err, data) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                data,
                message: "Get Successful",
            });
        }
    })
})

//get a todo by ID
router.get('/:id', async (req, res) => {
    await Todo.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                data: data,
                message: "Get Successful",
            });
        }
    })
})

//post todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                message: "Post Successful",
            });
        }
    });
})

//put todo
router.put('/:id', async (req, res) => {
    await Todo.findByIdAndUpdate({ _id: req.params.id},{
        $set: {
            name: "",
            email: "",
            password: ""
        }
    },
    {
        new: true
    },
    (err, data) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                data,

                message: "Get Successful",
            });
        }console.log(data)
    })
})

//Delete todo
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                message: "Delete Successful",
            });
        }
    })
})



module.exports = router;