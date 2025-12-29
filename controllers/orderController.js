const {OrderModel}=require("../Models/OrderSchema")
const {CartModel}=require("../Models/cartSchema")

const addOrders=async(req,res)=>{
    try{

        const cart=await CartModel.findOne({userId:req.user.id})

        if(!cart || cart.items.length==0){
            return res.status(400).json({message :"Cart is empty"})
        }

        const order=new OrderModel({
            userId:req.user.id,
            items:cart.items.map(i=>({productId:i.productId,quantity:i.quantity})),
            totalAmount:cart.totalAmount,
        })

        await order.save()

        //clear cart
        cart.items=[]
        cart.totalAmount=0
        await cart.save()

        res.status(201).json({message:"Order placed successfully",order})
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

const getOrder=async(req,res)=>{
   try{
    const orders=await OrderModel.find({userId:req.user.id})
    res.status(200).json({
        message:"All orders",
        data:orders
    })
   }
   catch(err){
    return res.status(500).json({message:"Serer error"})
   }
}

const getSingleOrder=async(req,res)=>{
    try{
        const order=await OrderModel.findById(req.params.id)
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }

        res.status(200).json({
            message:"Single order feteced",
            data:order
        })
    }
    catch(err){
        return res.status(500).send(err)
    }
}

const updateOrder=(req,res)=>{
    res.send("order updated")
}

module.exports={addOrders,getOrder,getSingleOrder,updateOrder}