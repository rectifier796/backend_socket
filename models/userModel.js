const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        validate:[size,'Invalid Phone Number']
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }

});

function size(val){
    return val>999999999 && val<10000000000;
}

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;