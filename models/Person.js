const mongoose = require("mongoose");
const bcrypt = require();
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "owner"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre('save', async function (next) {
  const Person = this;
  if (!Person.isModified('password')) return next();
  try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(Person.password, salt);
        Person.password = hashedPass;
        next();
    }
    catch (err) {
        throw next(err)
    }
});

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
