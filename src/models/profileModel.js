const mongoose=require("mongoose");

const dataSchema=mongoose.Schema({

    FirstName:{type:String},
    LastName:{type:String},
    Email:{type:String},
    City:{type:String},
    Mobile:{type:String},
    
    UserName:
    {
        type:String,
        unique:true
    },
    Password:{type:String}


},{versionKey:false});

const profileModel=mongoose.model('Profile',dataSchema);
module.exports=profileModel;