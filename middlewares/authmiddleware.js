const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

const protectedRoutes=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Not authorized,token missing"});
    }
    const token=authHeader.split(" ")[1];
    try{
        const decoded=jwt.verify(token,process.env.jwt_secret_key);
        req.user=decoded
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({message:"Invalid token or expired token"})
    }
}

module.exports={protectedRoutes}