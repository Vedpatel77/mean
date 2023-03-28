const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bloguser').then(()=>{
    console.log("conncetion with mongodb successful");
}).catch(()=>{
   console.log("error in connection");
})