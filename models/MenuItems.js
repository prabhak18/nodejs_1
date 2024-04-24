const mongoose=require('mongoose')

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true 
    },
    isDrink:{
        type:Boolean,
        default:false,
    },
    intigredientials:{
        type:[String],
        default:[],
    },
    numSales:{
        type:Number,
        default:0,
    }
})

const MenuItems=mongoose.model('MenuItems',menuSchema);
module.exports=MenuItems;
