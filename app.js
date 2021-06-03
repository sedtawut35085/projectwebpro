const mongoose = require("mongoose");
      express = require('express'),
      bodyParser = require("body-parser"),
      app = express(),
      flash = require('connect-flash')
      userss = require('./models/user'),
      passport = require("passport"),
      LocalStrategy = require("passport-local")
      session = require('express-session');


var IndexRoutes = require('./routes/index')
var AccountRoutes = require('./routes/account')
var CartRoutes = require('./routes/cart')
var StoreRoutes = require('./routes/store')
var CommentRoutes = require('./routes/comment');
app.use(session({
	secret:'happy dog',
	saveUninitialized: true,
	resave: true
}));
app.set('view-engine', 'ejs');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb' , extended: false}));
app.use(express.static('public'));
app.use(express.static(__dirname + 'public'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(flash());

app.use(require('express-session')({
  secret: 'secret is always secret.',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(userss.authenticate()))
passport.serializeUser(userss.serializeUser())
passport.deserializeUser(userss.deserializeUser())

app.use(async function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  next();
});

mongoose.connect("mongodb://localhost:27017/project",function(err,dbs){
    console.log('mongo connect')
});

app.use('/',IndexRoutes)
app.use('/account',AccountRoutes)
app.use('/cart',CartRoutes)
app.use('/store',StoreRoutes)
app.use('/comment',CommentRoutes)

app.listen(3000,()=>{
    console.log('server running')
})

  

  

