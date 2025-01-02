const mongoose=require('mongoose')

async function  connectToDatabase(){
   await mongoose.connect(process.env.MONGODB_URI)
   console.log("Database connected successfully")
}
module.exports = connectToDatabase;