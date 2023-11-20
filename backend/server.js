import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import products from './data/products.js'
import connectDb from './config/db.js'
connectDb();
const port =process.env.PORT
const app=express();


app.get('/',(req,res)=>{
    res.send(`Server is running..`)
})
app.get('/api/products',(req,res)=>{
    res.json(products)
})
app.get('/api/products/:id',(req,res)=>{
    const product=products.find((p)=>p._id===req.params.id);
    res.json(product)
})
// app.use(express.static(path.join(__dirname,'/frontend/build')))
app.listen(port,() => console.log(`Running ${port}`))