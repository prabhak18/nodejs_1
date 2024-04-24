const mongoose=require('mongoose');
const mongoURl='mongodb://localhost:27017/prabhakarorg';
mongoose.connect(mongoURl,{
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


