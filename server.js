import app from './backend/app.js'

const port = process.env.PORT 

app.set('port', port)


app.listen(port, ()=>{ 
    console.log(`Server running on http://localhost:${port}`)
})