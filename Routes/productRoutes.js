const express=require("express")
const { getProducts, getSingleProduct, addProduct, updateProduct, deleteProduct } = require("../controllers/productController")
const { protectedRoutes } = require("../middlewares/authmiddleware")
const { roleAllow } = require("../middlewares/roleMiddleWare")
const router=express.Router()

router.get("/product",getProducts)
router.get("/:id",getSingleProduct)
router.post("/addProduct",protectedRoutes,roleAllow("admin"),addProduct)
router.put("/updateProduct/:id",protectedRoutes,roleAllow("admin"),updateProduct)
router.delete("/deleteProduct/:id",protectedRoutes,roleAllow("admin"),deleteProduct)


module.exports=router