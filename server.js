const express= require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
require('dotenv').config()
app.use(bodyParser.json());
const PORT=process.env.PORT||3000;

const personRouter=require('./router/personRoutes')
const menuItems=require('./router/menuItemsRouter')


app.get("/",function(req,res){
    res.send("This is Home Page")
})

app.use('/person',personRouter)
app.use('/items',menuItems)



app.listen(PORT, () => {
	console.log(`Success! Your application is running on port https://localhost:${PORT}.`);
});
