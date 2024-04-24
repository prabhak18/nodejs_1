const express= require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());


const personRouter=require('./router/personRoutes')
const menuItems=require('./router/menuItemsRouter')


app.get("/",function(req,res){
    res.send("This is Home Page")
})

app.use('/person',personRouter)
app.use('/items',menuItems)



app.listen(3000,()=>{
    console.log("Listen port no 3000")
})