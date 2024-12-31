const express= require('express');
const app=express();
port=3000;

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
app.listen(`${port}`,()=>{
    console.log(`this app is start at port nunmber ${port}`)
})