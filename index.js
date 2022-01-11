const express = require('express');
const app = express();

app.use('/', (req, res)=>{
    res.send("Hello World")
    console.log(req.url)
})

app.listen(4000)