const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config;
const mongoose = require('mongoose')

const user = require('./routes/user.routes')
const auth = require('./routes/auth.routes')
const product = require('./routes/product.routes')
const cart = require('./routes/cart.routes')
const order = require('./routes/order.routes')

const app = express();
app.use(express.json());
app.use(bodyParser.json());

//Connect to database
mongoose.connect("mongodb://localhost:27017/ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database connection successful")
    })
    .catch((err) => {
        console.log(err)
    })


    app.get('/api/test', () => {
        console.log("Test successful")
    })

app.use("/api/user", user)
app.use("/api/auth", auth)
app.use("/api/product", product)
app.use("/api/cart", cart)
app.use("/api/order", order)

app.use(express.json())

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server is running !")
})