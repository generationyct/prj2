const createError     = require('http-errors')
const express         = require('express')
const path            = require('path')
const hbs             = require('hbs')
const mongoose        = require('mongoose')
const bodyParser      = require('body-parser')
const favicon         = require('serve-favicon')
const passport        = require('passport')
const cookieParser    = require('cookie-parser')
const logger          = require('morgan')
const session         = require('express-session')
const flash           = require('connect-flash')

const indexRouter = require('./routes/index')
// const userRouter = require('./routes/auth/user')
const tipRouter = require('./routes/tips')
const passportRouter = require('./routes/passport/passportRouter')
const passportUserRouter = require('./routes/passport/passportUserRouter')

const app = express();

// Atlas db config
const db = require('./config/keys').MongoURI;

// use mongoose

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(x => {
    console.log(`Connected to Mongo Atlas Database name: '${x.connections[0].name}'`)
  })
  .catch(err => {
    console.log('Error connecting to mongo', err)
  })

// Passport config
require('./config/passport')(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'), path.join(__dirname, 'views/passport'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'does not mather',
  resave: true,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Setting Global color Varibles
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// register partials
hbs.registerPartials(__dirname + "/views/partials")

// making response in json format possible for API
app.use(express.json())

// taking routes in
// app.use('/', indexRouter)
// app.use(userRouter)

app.use('/', tipRouter)
app.use(tipRouter)

app.use('/passport', passportRouter)
app.use(passportRouter)

app.use('/passport', passportUserRouter)
app.use(passportUserRouter)

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
