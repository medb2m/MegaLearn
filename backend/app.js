import express  from "express"

const app=express()

app.use((req, res, next) => {
    console.log('First MiddleWare')
    next()
})

app.use((req, res, next) => {
    res.send('Hello from Express!')
})


export default app