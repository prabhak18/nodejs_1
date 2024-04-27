const express= require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
require('dotenv').config()
app.use(bodyParser.json());
const PORT=process.env.PORT||3000;
const passport=require('./auth');

const personRouter=require('./router/personRoutes')
const menuItems=require('./router/menuItemsRouter')


app.use(passport.initialize())

const logdin=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Mede to: ${req.originalUrl}`);
    console.log("middleware called");
    next();
}
app.use(logdin)  // middleware calling


const localStreMidd=passport.authenticate('local',{session:false})  // authrization 


app.get("/",function(req,res){
    res.send("This is Home Page")
})

app.use('/person',localStreMidd,personRouter)   // route calling with auhentication
app.use('/items',localStreMidd,menuItems)



app.listen(PORT, () => {
	console.log(`Success! Your application is running on port https://localhost:${PORT}.`);
});
