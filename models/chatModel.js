const mongoose=require("mongoose");

const chatSchema=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    content:{
        type:String,
        required:true
    }

},{
    timestamps:true
});


const chatModel=mongoose.model("Chat",chatSchema);
module.exports=chatModel;