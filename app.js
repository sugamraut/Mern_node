const express= require('express');
const app=express();
port=3000;

app.get("/",(req,res)=>{
    res.json({
        message:"Hello World!!"
    })
})
app.get("/about",(req,res)=>{
    res.send("about")
})
app.listen(`${port}`,()=>{
    console.log(`this app is start at port nunmber ${port}`)
})