const mongoose = require("mongoose");

const plasmadonateSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    gender : {
        type:String,
        required:true,
    },
    age : {
        type:Number,
        required:true
    },
    blood : {
        type:String,
        required:true
    },
    phonenumber : {
        type:Number,
        required:true,
        unique:true
    },
    positivedate : {
        type:Date,
        required:true,
    },
    negativedate : {
        type:Date,
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

})
const Donate = new mongoose.model("Plasmadonate", plasmadonateSchema);
module.exports = Donate;