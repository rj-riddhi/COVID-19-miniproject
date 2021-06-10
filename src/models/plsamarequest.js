const mongoose = require("mongoose");

const plasmarequestSchema = new mongoose.Schema({
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
    date : {
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
    hospital : {
        type:String,
        required:true,
    }

})
const Request = new mongoose.model("Plasmarequest", plasmarequestSchema);
module.exports = Request;