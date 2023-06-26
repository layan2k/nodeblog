const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
const port = 4000 || process.env.PORT;
const mongoose = require('mongoose');
require("dotenv/config");
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');


// Controller Imports
const newPostController = require('./controllers/newPost')
const aboutPage = require('./controllers/aboutPage')
const contactPage = require('./controllers/contactPage')
const homePage = require('./controllers/home')
const getPost = require('./controllers/getPost')
const storePost = require('./controllers/storePost')
const newUser = require('./controllers/newUser')
const storeUser = require('./controllers/storeUser')
const loginUser = require('./controllers/loginUser')
const loginUserController = require('./controllers/loginController')
const logout = require('./controllers/logout')

// models
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');

dbkey = process.env.DB_KEY

// mongodb connection
mongoose.connect(dbkey).then(()=>{console.log("db connected")}).catch((err)=>{console.log(err)})

// Middleware
// const customMiddleWare = (req,res,next)=>{
//     console.log('customMiddleWare called')
//     next()
//}

const validateMiddleWare = require('./middleware/validateMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())


// app.use(customMiddleWare)
app.use('/posts/store',validateMiddleWare)
app.use(session({secret: 'keyboard cat',
resave: false,
  saveUninitialized: true}))

  global.loggedIn = null;
  app.use("*", (req,res,next)=>{
      loggedIn = req.session.userId;
      next()
  })
app.use(flash())

// routes
app.get('/',homePage)
app.get('/about',aboutPage)
app.get('/contact',contactPage)
app.get('/post/new',authMiddleware,newPostController)
app.get('/post/:id',getPost)
app.post('/posts/store',authMiddleware,storePost )
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUser)
app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUser)
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginUser)
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)
app.get('/auth/logout',logout)
app.use((req,res)=>{res.render('notfound')})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})