var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
mongoose = require('mongoose');
var user = require('./routers/user.router')
var post = require('./routers/post.router');
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require('./models/user.model');
mongoose.connect('mongodb://localhost:27017/app', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    app.listen(3000, function () {
        console.log("http://localhost:3000");
    });
});


app.use(user);
app.use(post);
