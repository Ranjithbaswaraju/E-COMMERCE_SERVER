const express=require("express")
const router=express.Router()
const { signupController,loginController } = require("../controllers/authenticationController")

router.post("/login",loginController)
router.post("/signup",signupController)



module.exports=router