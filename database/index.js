const mongoose=require('mongoose')

async function  connectToDatabase(){
   await mongoose.connect('mongodb+srv://sugamrautbim:sugam123@cluster0.a490a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   console.log("Database connected successfully")
}
module.exports = connectToDatabase;