const getAllUsers=(req,res)=>{
    res.send("all users")
}

const getAllOrders=(req,res)=>{
    res.send("All orders")
}

const updateProfile=(req,res)=>{
    res.send('updated Profile')
}

module.exports={getAllUsers,getAllOrders,updateProfile}