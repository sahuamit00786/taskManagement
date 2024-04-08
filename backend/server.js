import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes.js'
dotenv.config()
const app = express()

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
  console.log('Example app listening on port 3000!')
})