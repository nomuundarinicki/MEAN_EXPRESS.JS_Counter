
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


const app = express();


app.use(session({secret: 'idont know what goes here'}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/static/"));
app.set('views', __dirname + "/views/");
app.set('view engine', 'ejs');


app.get('/', function (req, res){

    if(req.session.counter){
        console.log("It's incrementing")
        req.session.counter++;
    }
    else {
        req.session.counter = 1;
    }
    locals = {
        sesscount: req.session.counter
    }
    console.log("in root route, locals = ", locals);
    res.render('index', locals);
});


app.post('/count', function (req, res){
    if(req.session.counter){
        console.log("count incrementing")
        req.session.counter++
    }
    locals = {
        sesscount: req.session.counter
    }
    console.log("in count route, locals = ", locals);
    res.redirect('/');
})


app.post('/reset', function(req, res){
    req.session.counter = 0
    console.log("resetting")
    res.redirect('/')
})


port = 8000;
app.listen(port, function () {
    console.log("Listening on port", port);
});
