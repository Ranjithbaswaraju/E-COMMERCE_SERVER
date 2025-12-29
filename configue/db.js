const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()


const connectDB=async(req,res)=>{
    try{
        await mongoose.connect(process.env.database_url,{dbName:process.env.database_name})
        console.log("data base connected successfully",process.env.database_name)
    }
    catch(err){
        res.status(400).send(err)
    }
}

module.exports={connectDB}