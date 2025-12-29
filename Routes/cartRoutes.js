const express=require("express")
const router=express.Router()
const {getCart, addCart, updateCart, removeCart}=require("../controllers/cartController")
const {protectedRoutes}=require("../middlewares/authmiddleware")
const {roleAllow}=require("../middlewares/roleMiddleWare");


router.get("/",protectedRoutes,roleAllow("user"),getCart)
router.post("/addCart",protectedRoutes,roleAllow("user"),addCart)
router.put("/updateCart",protectedRoutes,roleAllow("user"),updateCart)
router.delete("/deleteCart",protectedRoutes,roleAllow("user"),removeCart)



module.exports=router;