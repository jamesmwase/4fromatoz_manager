const createError = require('http-errors')
, express = require('express')
, helmet = require('helmet')
, path = require('path')
, logger = require('morgan')
, chalk = require('chalk')
, session = require('express-session')
, bodyParser = require('body-parser')
, bcrypt = require('bcryptjs')
, upload = require('express-fileupload')
;

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var siteRouter = require('./routes/site');

//databases
var mysql = require('mysql');

//models
var user = require('./models/user/user');

var sequelize = require('./config/sequelize').sequelize;

var app = express();
app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(upload())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Express-Session middleware */
app.use(session({
  store: new RedisStore(options),
  secret: 'sj*&8s7ydw3hedGUFYTDTD^r^%4^%$^&*TGKHTU^R76T*&TyYTYTutuTULILOoj(*&^*5$#$#)+_)(*&)', // the secret needs to be random unreadable characters.. check soon!!!!!
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
})

app.use('', siteRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

const port = 2001;

console.log('- Network address: ' + chalk.cyan('http://' + addresses[0] + ':' + chalk.green(port) + '/'));

app.listen(port, function() {
	console.log('app listening on ' + chalk.green(port) + '...');
})
