const express=require("express")
const router=express.Router()
const {addOrders, getOrder, getSingleOrder, updateOrder}=require("../controllers/orderController")
const { protectedRoutes } = require("../middlewares/authmiddleware")
const { roleAllow } = require("../middlewares/roleMiddleWare")

router.post("/addOrder",protectedRoutes,roleAllow("user"),addOrders)
router.get("/my-orders",protectedRoutes,roleAllow("user"),getOrder)
router.get("/:id",getSingleOrder)
router.put("/:id",updateOrder)



module.exports=router