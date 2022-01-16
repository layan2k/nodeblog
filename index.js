const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
const port = 4000;
const mongoose = require('mongoose');
require("dotenv/config");
const bodyParser = require('body-parser');
// Controller Imports
const newPostController = require('./controllers/newPost')
const aboutPage = require('./controllers/aboutPage')
const contactPage = require('./controllers/contactPage')
const homePage = require('./controllers/home')
const getPost = require('./controllers/getPost')
const storePost = require('./controllers/storePost')

// models
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');

dbkey = process.env.DB_KEY

// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/project1').then(()=>{console.log("db connected")}).catch((err)=>{console.log(err)})

// Middleware
// const customMiddleWare = (req,res,next)=>{
//     console.log('customMiddleWare called')
//     next()
//}
const validateMiddleWare = require('./middleware/validateMiddleware')

app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
// app.use(customMiddleWare)
app.use('/posts/store',validateMiddleWare)

// routes
app.get('/',homePage)
app.get('/about',aboutPage)
app.get('/contact',contactPage)
app.get('/post/new',newPostController)
app.get('/post/:id',getPost)
app.post('/posts/store',storePost )

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})