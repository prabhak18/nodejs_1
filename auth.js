const passport=require('passport')
const localStrategy=require('passport-local').Strategy;
const Person=require('./models/Person.js')
passport.use(new localStrategy(async(USERNAME,PASSWORD,done)=>{
    try{
        console.log("Received Crediential",USERNAME,PASSWORD)
        const user= await Person.findOne({username:USERNAME}) 
        if(!user){
            console.log("wrong username")
            return done(null,false,{message:"Incorrect User"});
        }
        const isPasswordMatch=user.comparePassword(PASSWORD)
        console.log(isPasswordMatch)
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:"Incorrect password"})
        }
    }
    catch(err){
        return done(err)
    }
}))



module.exports=passport