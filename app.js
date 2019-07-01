var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//Init app
var app = express();

var fs = require('fs');

var server = require('http').Server(app)
var io = require('socket.io')(server);

//Lay duong dan cac router
var index2 = require('./routes/index2');
var routeCustomer = require('./routes/customer');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Loger Middleware
app.use(logger('dev'));

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//Set port
app.set('port', process.env.PORT || 3001);

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Connect flash
app.use(flash());

//Global vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', routeCustomer);
//Dinh vi toi tap tin router
app.use('/quantrac', index2);

// catch 404 and forward to error handler
app.use('*', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    //res.render('page404',{ title: '404 - Page not found' })
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//Start server
server.listen(app.get('port'), function() {
    console.log('Server started on http://localhost:' + app.get('port'));
});

//thu vien them hinh cua tuan
app.use(express.static(__dirname + '/public'));

var roles = {
    sender: "",
    receiver: ""
};
io.sockets.on('connection', function(socket) {
    socket.on('setRole', function(data) {
        socket.role = data.trim();
        roles[socket.role] = socket.id;
        console.log("Role " + socket.role + " is connected.");
    });

    socket.on("sendPhoto", function(data) {
        var guess = data.base64.match(/^data:image\/(png|jpeg);base64,/)[1];
        var ext = "";
        switch (guess) {
            case "png":
                ext = ".png";
                break;
            case "jpeg":
                ext = ".jpg";
                break;
            default:
                ext = ".bin";
                break;
        }
        var savedFilename = "/upload/" + randomString(10) + ext;
        fs.writeFile(__dirname + "/public" + savedFilename, getBase64Image(data.base64), 'base64', function(err) {
            if (err !== null)
                console.log(err);
            else
                io.to(roles.receiver).emit("receivePhoto", {
                    path: savedFilename,
                });
            console.log("Send photo success!");
        });
    });

    socket.on('disconnect', function() {
        console.log("Role " + socket.role + " is disconnect.");
    });
});

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getBase64Image(imgData) {
    return imgData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
}


module.exports = app;