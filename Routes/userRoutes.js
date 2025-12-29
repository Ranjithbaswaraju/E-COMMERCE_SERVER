const express=require("express")
const { getAllUsers, getAllOrders, updateProfile } = require("../controllers/userController")
const { protectedRoutes } = require("../middlewares/authmiddleware")
const router=express.Router()

router.get("/profile",getAllUsers)
router.get("/orders",getAllOrders)
router.put("/profile",updateProfile)


module.exports=router