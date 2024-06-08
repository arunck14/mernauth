import express from 'express';
import mongoose, { mongo } from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config;
const MONGO="mongodb+srv://arunmernauth:arunmernauth@mern-auth.lp4wfce.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=mern-auth"

const  app = express();
mongoose.connect(MONGO);

app.listen(3000,()=>{
    // console.log(process.env.MONGO);
    console.log("server listening port 3000");
    
})
