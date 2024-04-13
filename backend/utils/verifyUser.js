import jwt from 'jsonwebtoken'

export const verifyUser = (req,res)=>{
    const token = req.cookies.access_token;
    if(!token)
    {
        return res.status(401,'Invalid token')
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err)
        {
            return res.status(401,'unauthorized')
        }
        req.user = user;
        next();
    })
}