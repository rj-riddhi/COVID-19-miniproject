const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const signupSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique : true
    },
    password : {
        type:String,
        required:true
    },
    confirmpassword : {
        type:String,
        required:true
    },
    phonenumber : {
        type:Number,
        required:true,
        unique:true
    }
})


signupSchema.pre("save" , async function(next) {
    
    // Jyare Password vala field ma change thatu hoy tyarej aa condition check thase...
    
    if(this.isModified("password")){
    
    console.log(this.password);
    this.password = await bcrypt.hash(this.password , 10);
    console.log(this.password);
    this.confirmpassword = undefined;
    }
    next();
})

// COLLECTIONS

const Register = new mongoose.model("Plasmaregister", signupSchema);
module.exports = Register;

