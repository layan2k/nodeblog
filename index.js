const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
const port = 4000;
const mongoose = require('mongoose');
require("dotenv/config");
const bodyParser = require('body-parser');


// models
const BlogPost = require('./models/BlogPost')

dbkey = process.env.DB_KEY

// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/project1').then(()=>{console.log("db connected")}).catch((err)=>{console.log(err)})

// Express Settings
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// routes
app.get('/',async (req,res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index',{blogposts})
})
app.get('/about', (req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.get('/post/new', (req,res)=>{
    res.render('create')
})

app.get('/post/:id',async(req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {blogpost})
})

app.post('/posts/store',(req,res)=>{
    let image = req.files.image
    image.mv(path.resolve(__dirname,'public/assets/img',image.name),async(error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })

} )

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})