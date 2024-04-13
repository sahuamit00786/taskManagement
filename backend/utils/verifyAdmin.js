import jwt from 'jsonwebtoken'

export const verifyAdmin = (req,res,next) => {
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
        if(!user.isAdmin)
        {
            return res.status(401,'unauthorized')
        }
        next()
    })
}