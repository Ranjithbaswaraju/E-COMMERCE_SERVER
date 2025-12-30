const express=require('express')
const app=express()
const dotenv=require("dotenv")
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const AuthenticationRoutes=require("./Routes/authontication")
const ProductRoutes=require("./Routes/productRoutes")
const CartRoutes=require("./Routes/cartRoutes")
const orderRoutes=require("./Routes/orderRoutes")
const UserRoutes=require("./Routes/userRoutes")
const{connectDB}=require("./configue/db")
const cors=require('cors')
connectDB()





app.use("/api/auth",AuthenticationRoutes)
app.use("/api/product/",ProductRoutes)
app.use("/api/cart/",CartRoutes)
app.use("/api/order/",orderRoutes)
app.use("/api/user/",UserRoutes)

app.use(cors({
    origin:"http://localhost:5173/"
}))

app.listen(process.env.port,()=>{
    console.log('server running at ',process.env.port)
})