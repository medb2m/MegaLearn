import express  from "express"
import morgan from "morgan"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from "dotenv"

const app=express()

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//DB Connection
mongoose.set('debug', true)
mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("Data Base Connected !")
}).catch(err =>{
    console.log(err)
})

app.use((req, res, next) => {
    console.log('First MiddleWare just ran')
    next()
})

app.use('/',(req, res) => {
    res.send('Hello from Express!')
})


export default app