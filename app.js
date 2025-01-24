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

//edit the data
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
    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message: "blog deleted successfully"
    }) 
})
//update
app.patch("/blog/:id",(req,res)=>{

})


app.use(express.static('./storage'))

app.listen(process.env.PORT,()=>{
    console.log(`this app is start at port number`)
})