import express from 'express';
const port =8000;
const app=express();
app.get('/',(req,res)=>{
    res.send(`Server is running..`)
})
app.use(express.static(path.join(__dirname,'/frontend/build')))
app.listen(port,() => console.log(`Running ${port}`))