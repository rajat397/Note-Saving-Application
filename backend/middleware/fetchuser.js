import Jwt from "jsonwebtoken";
const JWT_SECRET="kyahaalhaimahibhai";
const fetchUser=(req,res,next)=>{
    //get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).json({error:"Please authenticate using a valid token"})
    }
    try{
        const data=Jwt.verify(token,JWT_SECRET);
        console.log(data);
        req.user=data.id;
        next()
    }catch(error){
        return res.status(401).json({error:"Please authenticate using a valid token"})
    }
    
}

export default fetchUser;