require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000 ;
require('./db/conn');
const User = require('./db/model');
const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/users',(req,res)=>{
    res.send("<h1>this is login page of node</h1>");
});
app.post('/users',async(req,res)=>{
    try {
        // console.log(req.body);
        const addUser = new User(req.body);
        const token = await addUser.createtoken();

        const saveUser = await addUser.save();
        res.send(saveUser);

    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/login',(req,res)=>{
    res.render('sucess');
})
app.post('/login',async(req,res)=>{
    try {
        // const email = req.body.email;
        // console.log(email);
        // const password = req.body.password;
        const {email,password}=req.body;
        // console.log(email+" + "+password);
        const user = await User.findOne({ email: email });
        console.log(user);
        const ismatch = await bcrypt.compare(password,user.password);

        const token = await user.createtoken();
        console.log(token);

        if (ismatch) {
            res.status(200).send(user);
        }else{
            res.send("incorrect password");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port,()=>{
    console.log("connection done");
});