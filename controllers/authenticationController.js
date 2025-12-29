const { UserModel } = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

const loginController =async (req, res) => {
  try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Please enter all fields"
            })
        }
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).send("password is incorrect")
        }
        
        const token=await jwt.sign(
            {id:user._id,role:user.role},
            process.env.jwt_secret_key,
            {expiresIn:"24h"}
        )

        res.status(200).json({
            message:"login successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
  }
  catch(err){
    return res.status(400).send(err)
  }
};

const signupController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already Exists please login with your credentials",
      });
    }

    if (!email || !name || !password || !role) {
      return res.status(400).json({
        message: "Please enter the all fields",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const User = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const data=await User.save()
    return res.status(200).json({
        message:"User Registered Successfully",
        data:data
    })
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { loginController, signupController };
