const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique : true
    },
    phonenumber : {
        type:Number,
        required:true,
        unique:true
    },
    address : {
        type:String,
        required:true,
    },
    state : {
        type:String,
        required:true,
    },
    city : {
        type:String,
        required:true,
    },
    zip : {
        type:Number,
        required:true,
    },
    symptoms : {
        type:[String],
        required:true,
    },
    message : {
        type:String,
        required:true,
    },
});


// COLLECTIONS

const Contact = new mongoose.model("Contactus", contactSchema);
module.exports = Contact;

