const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
const port = 4000;

app.use(express.static(__dirname + '/public'))

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/about', (req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/post',(req,res)=>{
    res.render('post')
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})