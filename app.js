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
.use((req, res, next) => {
    req.session.thingsToDo = (req.session.thingsToDo || []);
    next();
})

app.get('/todo', (req, res, next) => {
    res.render('todo.ejs', { thingsToDo: req.session.thingsToDo });
})
.post('/todo/add', urlencodedParser , (req, res, next) => {
    if (req.body.todo !== '') {
        req.session.thingsToDo.push(req.body.todo);
    }
    res.redirect('/todo');
})
.get('/todo/delete/:index', (req, res, next) => {
    if (req.params.index !== '') {
        req.session.thingsToDo.splice(req.params.index, 1);
    }
    res.redirect('/todo');
})
.use((req, res, next) => {
    res.redirect('/todo');
})

app.listen(8080);