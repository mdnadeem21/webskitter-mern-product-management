
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./app/config/db')

// Routes
const productRoutes = require('./app/routes/product.routes')



// DB Connect
connectDB()
const app=express();
// middleware 
app.use(express.json());
app.use(cors())

app.get('/',(req,res) => {
    res.send(`<h1>Welcome to the product management app...</h1>`)
})
app.use('/api/v1/products',productRoutes)

const PORT = process.env.PORT

app.listen(PORT,(error)=>{
    if(error){
        console.log(`Error in PORT Listening : ${error.message}`);
    }else{
        console.log("server is running on port ",`http://localhost:${PORT}`);
    }
})