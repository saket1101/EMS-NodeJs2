
const jwt = require("jsonwebtoken")


const authUser = async ( req,res,next) =>{
  try{  const {authorization} = req.headers
  
    if(authorization && authorization.startsWith("Bearer")){
        // get token from header
        const token = authorization.split(" ")[1]
       // TOKEN VERIFY
       const data = jwt.verify(token, process.env.JWT_KEY);
       // Get User from id 
       req.user =  data.user
      
      next()

    }else{
        res.send ("User not Authorized")
 
    }
}catch(error){
    res.send(error.message)
}
};

const authorizePermission  = (...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return res.status(403).json('Unauthorized error')
    }
    next();
  }
};

const authSupervisior = async (req,res,next)=>{
   try{  const {authorization} = req.headers
  
    if(authorization && authorization.startsWith("Bearer")){
        // get token from header
        const token = authorization.split(" ")[1]
       // TOKEN VERIFY
       const data = jwt.verify(token, process.env.JWT_KEY);
       // Get User from id 
       req.supervisior =  data.supervisior
       console.log(req.supervisior.departmentName)
      
      next()

    }else{
        res.send ("User not Authorized")
 
    }
}catch(error){
    res.send(error.message)
}
};

module.exports = {authUser,authorizePermission,authSupervisior}