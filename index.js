const express = require('express');
const app = express();
// get cookies
const cookieParser = require('cookie-parser');
//by default port number is 80
const port = 8000;
const expressLayouts = require('express-ejs-layouts'); 
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assests/scss',
    dest: './assests/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))
app.use(express.static('./assests'))
app.use(expressLayouts);    

app.use(express.urlencoded());
app.use(cookieParser());

//extract style and scripts into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// mongo store is used store the session cookie in the db
app.use(session({
    name: 'codieal',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err||'connect-mongodb setup  ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//use express router
app.use('/', require('./routes'))
app.listen(port, function(err){
    if(err){
        // console.log('Error: ', err);
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})