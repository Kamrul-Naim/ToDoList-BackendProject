const mongoose=require("mongoose");

const dataSchema=mongoose.Schema({

    UserName:
    {
        type:String
    },
    Subject:{type:String},
    Description:{type:String},
    Status:{type:String},
    CreateDate:{type:Date},
    UpdateDate:{type:Date}
},{versionKey:false});

const todoListModel=mongoose.model('TodoList',dataSchema);
module.exports=todoListModel;