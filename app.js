require('dotenv').config()
const express= require('express');
const app=express();
//  const mongoose=require('mongoose')
// mongoose.connect('mongodb+srv://sugamrautbim:sugam123@cluster0.a490a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const connectToDatabase=require('./database/index');

connectToDatabase()
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello World!!"
    })
})
app.get("/about",(req,res)=>{
    res.status(200).json({
        message:"hello i am about page!!"
    })
})
app.listen(process.env.PORT,()=>{
    console.log(`this app is start at port nunmber`)
})

//mongodb+srv://sugamrautbim:<db_password>@cluster0.a490a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0