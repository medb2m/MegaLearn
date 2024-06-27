import app from './backend/app.js'

const port = process.env.PORT || 3030

app.set('port', port)

ahhaha


app.listen(port, ()=>{ 
    console.log(`Server running on http://localhost:${port}`)
})