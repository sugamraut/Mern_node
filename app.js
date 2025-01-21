require('dotenv').config()
const express= require('express');
const app=express();
const connectToDatabase=require('./database/index');
const Blog = require('./model/blogModel');
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage })
app.use(express.json())
connectToDatabase()

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello World!!"
    })
})
app.post("/blog",upload.single('image'),async(req,res)=>{
    console.log(req.body)
    const {title,subtitle,description,image}=req.body
    console.log(title,subtitle,description,image)
    if(!title||!description||!subtitle||!image){
        return res.status(400).json({
            message: "please provide the title description, substile ,image"
        })
    }
    await Blog.create({
        title:title,
        description: description,
        subtitle: subtitle,
        image:filename

    })
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