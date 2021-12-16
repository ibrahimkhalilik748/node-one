const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoHandler = require('./src/router/todoHandler')

const port = 5000;

const app = express();
app.use(express.json());
app.use(cors());


mongoose
    .connect(`mongodb+srv://tasting123:tasting456@cluster0.em86h.mongodb.net/tasting?retryWrites=true&w=majority`, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => console.log("Hello"))
    .catch(err => console.log(err))
    

// mongoose.connect('mongodb://localhost/lol', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Hello"))
//     .catch(err => console.log(err))


app.use('/todo', todoHandler)

    function errorHandler(err, req, res, next) {
        if(res.headersSent){
            return next(err);
        }
        res.status(500).json({ error: err})
    }




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})