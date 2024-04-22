import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()

app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET", "POST","PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((error)=>{
    console.log('Could not connect to MongoDB',error)
})


app.use(express.json())
app.use(router)
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
