const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productsModels')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes 1
app.get('/', (req, res) =>{
    res.send('Hello Node API for first time')
})

// routes 2
app.get('/blog', (req, res) =>{
    res.send('Hello Blog my name is Rohit')
})

// how to get data from database
app.get('/product', async(req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/product', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // when we cannot find any product in database
        if(!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a Product from database
app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: `connot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://anchal:Anchal99999@anchalapis.ozszngk.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=AnchalAPIs')
.then(() => {
    console.log('Now Connected to MongoDB.....')
    app.listen(3000, ()=>{
        console.log(`Node API app is running on port 3000`)
    })    
}).catch((error) => {
    console.log(error)
})