require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000 ;
require('./db/conn');
const User = require('./db/model');
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser');
const cors = require('cors');
app.use(cors({
    origin:"http://localhost:4200",
    credentials:true
}));
app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/users',(req,res)=>{
    res.send("<h1>this is login page of node</h1>");
});
app.get('/users/:id',async(req,res)=>{
    try {
        // console.log("triggerd");
        // console.log(req.params.id);
        const userfind = await User.findById({_id : req.params.id})
        // console.log(userfind);
        res.status(200).send(userfind);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.post('/users',async(req,res)=>{
    try {
        // console.log(req.body);
        const addUser = new User(req.body);
        const token = await addUser.createtoken();

        const saveUser = await addUser.save();
        res.cookie('jwt',token);
        res.send(saveUser);

    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/login',(req,res)=>{
    res.send('sucess');
})
app.post('/login',async(req,res)=>{
    try {
      
        // const email = req.body.email;
        // console.log(email);
        // const password = req.body.password;
        const {email,password}=req.body;
        console.log(email+" + "+password);
        const user = await User.findOne({ email: email });
        // console.log(user);
        const token = await user.createtoken();
        // console.log(token);
        // console.log(user);
        const ismatch = await bcrypt.compare(password,user.password);
        res.cookie("jwt",token);
        
        
        if (ismatch) {
            res.send(user);
            // console.log(token);
        }else{
            res.send("incorrect password");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

// app.get('/tabledata',(req,res)=>{
//     res.send('sucess');
// })
app.get('/tabledata',async(req,res)=>{
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.patch('/users/:id',async(req,res)=>{
    try {
        // const _id = req.body._id;
        // console.log(typeof(req.body));
        const updateuser = await User.findByIdAndUpdate(req.params.id,req.body);
        console.log(typeof(updateuser));
        res.send(updateuser)
    } catch (error) {
        res.status(400).send(error);
    }
})
app.delete('/users/:id',async(req,res)=>{
    try {
        const updateuser = await User.findByIdAndDelete(req.params.id);
        // console.log(typeof(updateuser));
        res.send(updateuser)
    } catch (error) {
        res.status(400).send(error);
    }
})


app.listen(port,()=>{
    console.log("connection done");
});