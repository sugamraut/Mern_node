require('dotenv').config()
const express= require('express');
const app=express();
app.use(express.json())
const connectToDatabase=require('./database/index');
const Blog = require('./model/blogModel');
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage })
const fs=require("fs")

connectToDatabase()

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello World!!"
    })
})
//create the table
app.post("/blog",upload.single('image'),async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    const {title,subtitle,description,image}=req.body
    console.log(title,subtitle,description,image)
    const filename =req.file.filename

    if(!title||!description||!subtitle){
        return res.status(400).json({
            message: "please provide the title description, substile ,image"
        })
    }
    await Blog.create({
        title:title,
        description: description,
        subtitle: subtitle,
        image : filename

    })
    res.status(200).json({
        message:"blog push successfully"
    })
})

//fetch the data from the database abd display them
app.get("/blog",async(req,res)=>{
    const blogs=await Blog.find()//return always array 
    res.status(200).json({
        message:"blogs fetch successfully",
        data: blogs
    })
})

//get the data
app.get("/blog/:id",async(req,res)=>{
    console.log(req.body)
    const id=req.params.id
   const blog = await Blog.findById(id)

   if(!blog){
    res.status(400).json({
        message: "no data found"
    })
   }else{
    res.status(200).json({
        message:"Fetched data sucessfully",
        data: blog
    })
   }
})

//delete
app.delete("/blog/:id",async(req,res)=>{
    const id=req.params.id
    const blog=await Blog.findById(id)
    const imageName=blog.image
    await Blog.findByIdAndDelete(id)
    fs.unlink(`storage/${imageName}`,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("file delected successfully")
        }
    })

    res.status(200).json({
        message: "blog deleted successfully"
    }) 
})
//update/edit
app.patch("/blog/:id",upload.single('image'),async(req,res)=>{
    const id=req.params.id
    const{title,substile,description}=req.body
    let imageName;
    if(req.file){
        imageName=req.file.filename
        const blog=await Blog.findById(id)
        const oldimageName=blog.image
        fs.unlink(`storage/${oldimageName}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("file delected successfully")
            }
        })
    }
    await Blog.findByIdAndUpdate(id,{
        title: title,
        substile:substile,
        description:description,
        image:imageName
    })
    res.status(200).json({
        message:"blog updated successfully"
    })
    
})


app.use(express.static('./storage'))

app.listen(process.env.PORT,()=>{
    console.log(`this app is start at port number`)
})