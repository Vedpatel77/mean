const express = require('express');
const app = express();
const port = process.env.PORT || 3000 ;
require('./db/conn')
const User = require('./db/model');

app.get('/login',(req,res)=>{
    res.send("<h1>this is login page of node</h1>");
});

app.listen(port,()=>{
    console.log("connection done");
});