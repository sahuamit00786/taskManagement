import bcryptjs from 'bcryptjs';
import { User } from '../models/User.model.js';
import jwt from 'jsonwebtoken'
function authController()
{
    return{
        async signup(req,res)
        {
            const{username,email,password} = req.body;
            console.log(req.body)
            if(!username || !email || !password)
            {
                res.status(400).json({
                    message: "Please fill all the fields"
                })
            }
            const hashedPassword = bcryptjs.hashSync(password,10)
            const newUser = new User({
                username,
                email,
                password:hashedPassword
            })
            try {
                await newUser.save();
                console.log(newUser)
                res.json('Signup successful')
            } catch (error) {
                console.log(error)
            }

        },
        async signin(req,res)
        {
            const{username,password} = req.body;
            console.log(req.body)
            if(!username || !password)
            {
                res.status(400).json({
                    message: "Please fill all the fields"
                })
            }
            
            try {

                const validUser = await User.findOne({username})
                const validPassword = bcryptjs.compareSync(password,validUser.password)
                if(!validPassword){
                    res.json({message: "Invalid password"})
                }

                const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
                console.log(validUser)
                res.status(200).cookie('access_token',token,{
                    httpOnly:true,
                }).json(validUser)

            } catch (error) {
                // console.log(error)
            }

        },

        async signout(req,res)
        {
            res.clearCookie('access_token');
            res.status(200).json({message:"signing out"})
        }
    }   
}

export default authController;