var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
mongoose = require('mongoose');
var user = require('./routers/user.router')
var post = require('./routers/post.router');
var page = require('./routers/page.router');
var rating = require('./routers/postRating.router');
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require('./models/user.model'); //mongodb://localhost:27017/app

mongoose.connect('mongodb://pruebas:abc123.@ds119572.mlab.com:19572/heroku_23f3w0kp', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    app.listen(3000, function () {
        console.log("http://localhost:3000");
    });
});


app.use(user);
app.use(post);
app.use(page);
app.use(rating);