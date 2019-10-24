const express = require('express');
// const session = require('session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extend: false });

const app = express();
app.set('view engine', 'ejs');

const toDoList = [
    'Show the to do list',
    'Add thing to do',
    'remove thing to do'
];

app.get('/todo', (req, res) => {
    res.render('todo.ejs', { toDoList: toDoList });
})
.post('/todo/add', (req, res) => {
    toDoList.push('Add');
    res.render('todo.ejs', { toDoList: toDoList });
})

app.listen(8080);