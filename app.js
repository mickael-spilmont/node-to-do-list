const express = require('express');
// const session = require('session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extend: false });

const toDoList = [];

const app = express();

app.get('/todo', (req, res) => {
    res.render('todo.ejs');
});

app.listen(8080);