const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello NODE API');
})

app.get('/product', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})


mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://wjr46269:william8@cluster0.46lb860.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected');
        app.listen(3000, () => {
            console.log(`Node Api is running`);
        })

    }).catch((error) => {
        console.log(error);
    })