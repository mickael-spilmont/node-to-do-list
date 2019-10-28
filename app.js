const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extend: false });

const app = express();
app.set('view engine', 'ejs');

app.use(cookieSession({
    name: 'session',
    secret: 'S3cr3tK3y'
}))

app.use((req, res, next) => {
    req.session.thingsToDo = (req.session.thingsToDo || []);
    next();
})

app.get('/todo', (req, res, next) => {
    res.render('todo.ejs', { thingsToDo: req.session.thingsToDo });
})
.post('/todo/add', urlencodedParser , (req, res, next) => {
    console.log(req.body.todo);
    req.session.thingsToDo.push(req.body.todo);
    res.render('todo.ejs', { thingsToDo: req.session.thingsToDo });
})
.get('/todo/delete/:index', (req, res, next) => {
    console.log(req.params.index);
    req.session.thingsToDo.splice(req.params.index, 1);
    res.render('todo.ejs', { thingsToDo: req.session.thingsToDo });
})

app.listen(8080);