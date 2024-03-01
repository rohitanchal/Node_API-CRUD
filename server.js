const express = require('express')
const app = express()

// routes
app.get('/', (req, res) =>{
    res.send('Hello Node API for first time')
})

app.listen(3000, ()=>{
    console.log(`Node API app is running on port 3000`)
})