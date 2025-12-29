const {CartModel}=require("../Models/cartSchema")
const {productModel}=require("../Models/productSchema")

const getCart=async(req,res)=>{
  try{
    const cart=await CartModel.findOne({userId:req.user.id})

    if(!cart){
        return res.status(200).json({
            items:[],
            totalAmount:0
        })
    }
    res.status(200).json(cart)
  }
  catch(err){
    res.status(400).send("server error")
  }
}
const addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create cart
    let cart = await CartModel.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new CartModel({
        userId: req.user.id,
        items: [],
        totalAmount: 0
      });
    }

    // Check if item already exists
    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Update total
    cart.totalAmount += product.price * quantity;

    // Save cart
    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateCart=async(req,res)=>{
    try{
        const {productId,quantity}=req.body;


        const cart=await CartModel.findOne({userId:req.user.id})
        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }

        const product=await productModel.findById(productId)
        const item=cart.items.find(
            item=>item.productId.toString()===productId
        )

        if(!item){
            return res.status(404).json({message:"Item not found in cart"})
        }

        //update total
        cart.totalAmount-=item.quantity*product.price;
        item.quantity=quantity;
        cart.totalAmount+=quantity*product.price

        await cart.save()

        res.status(200).json({
            message:"Cart updated",
            cart
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).send("server error")
    }
}

const removeCart=async(req,res)=>{
    try{
        const {productId}=req.body;

        const cart=await CartModel.findOne({userId:req.user.id})
        if(!cart){
            return res.status(404).json({message:"cart not found"})
        }

        const product=await productModel.findById(productId);
        const item=cart.items.find(
            item=>item.productId.toString()===productId
        );

        cart.items=cart.items.filter(
            item=>item.productId.toString()!==productId
        );

        cart.totalAmount-=item.quantity*product.price;
        await cart.save();

        res.json({message:"Item removed",cart})
    }
    catch(err){
        return res.status(400).send("server error")
    }
}

module.exports={getCart,addCart,updateCart,removeCart}