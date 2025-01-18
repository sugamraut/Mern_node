require('dotenv').config()
const express= require('express');
const app=express();
const connectToDatabase=require('./database/index');
connectToDatabase()
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello World!!"
    })
})
app.post("/blog",(req,res)=>{
    console.log(req.body)
    res.status(200).json({
        message:"blog push successfully"
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

