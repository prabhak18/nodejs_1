const express=require('express');
const Person = require('../models/Person');
const router=express.Router()


router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newPerson=new Person(data);
        const response =await newPerson.save();
        res.status(200).json(response);
        console.log("Saved Successfully ");
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Error",err})

    }
});

router.get("/",async(req,res)=>{
    try{
        const data= await Person.find()
        console.log("DAta fetch into desktop successfully");
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Error "})
    }
});


router.get('/:workType',async (req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'|| workType=='waiter'|| workType=="owner"){
            const response=await Person.find({work:workType});
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Invalid work Type"})
        }
    }
    catch(err){
        console.log(err)
        res.status(505).json({error:"Internal Server Error"});
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;
        const updateddata=req.body;
        const response=await Person.findByIdAndUpdate(personid,updateddata,{
            new:true,
            runValidators:true           
        })
        if(!response){
            return res.status(404).json({error:id+"Does not Exist"})
        }
        console.log("data update successfully",+response)
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:err+"Internal server error"})
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const deletedid=req.params.id;
        const response=await Person.findByIdAndDelete(deletedid);
        if(!response){
            return res.status(404).json({error: id+"not found"})
        }
        console.log("data Delete succefully")
        res.status(200).json({message:" delete successfully"})

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err+"Internal server Error"})
    }
})





module.exports=router;