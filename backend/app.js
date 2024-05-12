import express  from "express"
import morgan from "morgan"
import cors from 'cors'

const app=express()


app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


app.use((req, res, next) => {
    console.log('First MiddleWare')
    next()
})

app.use((req, res) => {
    res.send('Hello from Express!')
})


export default app