const mongoose=require('mongoose');
require('dotenv').config();
// const mongoURL='mongodb://localhost:27017/prabhakarorg';
const mongoURL=process.env.MONGODB_URL;
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const db=mongoose.connection
db.on('connected',()=>{
    console.log("mongo db connected successfully")
})
db.on('error',(err)=>{
    console.log('mongodb connection error',err)
})
db.on('disconnected',()=>{
    console.log("mongodb  can be disconnected successfully")
})
module.exports=db;


