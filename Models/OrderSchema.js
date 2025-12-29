const mongoose=require("mongoose")

const OrderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{type:Number,required:true,min:1}
        }
    ],
    totalAmount:{type:Number,required:true,mim:1},
},{timestamps:true})


const OrderModel=mongoose.model("order",OrderSchema)

module.exports={OrderModel}