import express  from "express"
import morgan from "morgan"

const app=express()

app.use(morgan("dev"))
app.use((req, res, next) => {
    console.log('First MiddleWare')
    next()
})

app.use((req, res) => {
    res.send('Hello from Express!')
})


export default app