const mongoose=require("mongoose")


const ProductSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:5},
    description:{type:String,required:true,minlength:4},
    price:{type:Number,required:true},
    category:{type:String,required:true,minlength:2},
    stock:{type:Number,required:true}
    // image:{type:String}
},{timestamps:true})


const productModel=mongoose.model("products",ProductSchema)

module.exports={productModel}