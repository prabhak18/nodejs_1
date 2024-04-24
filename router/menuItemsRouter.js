const express= require('express')
const router= express.Router()
const MenuItems=require('../models/MenuItems')

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenuItems= new MenuItems(data);
        const response=await newMenuItems.save(data)
        res.status(200).json(response)
        console.log("Menu Items Data Save Succeesully")
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Error "})
    }
})


router.get('/',async(req,res)=>{
    try{
        const data=await MenuItems.find()
        console.log("Fetch Data ItemMenu Successfully")
        res.status(500).json(data)
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})
router.get('/:tastey',async(req,res)=>{
    try{
        const tastey=req.params.tastey;
        if(tastey=="sweet"|| tastey=="spicy"|| tastey=="sour"){
            const response=await MenuItems.find({taste:tastey})
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:tastey+" not Found"}) 
        }
    }
    catch(err){
        console.log(err)
        res.status(505).json({error:"Internal Server Error"})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const menuid=req.params.id;
        const updatemenu=req.body;
        const response=await MenuItems.findByIdAndUpdate(menuid,updatemenu,{
            new:true,
            runValidators:true
        })
        if(!response){
            res.status(404).json({error:" Not Found "})
        }
        console.log("Date update successfully")
        res.status(200).json({Success:"Successfully Updated.."})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error "})
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const deleteid=req.params.id;
        const response=await MenuItems.findByIdAndDelete(deleteid)
        if(!response){
            return res.status(404).json({error:"User Not Found "})
        }
        console.log("delete success")
        res.status(200).json({message:"Succcessfullly delete"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"data not delete because internal error"})
    }
})

module.exports =router