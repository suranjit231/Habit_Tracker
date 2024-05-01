import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },

    otp:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Otp"
    }
});

const userModel =mongoose.model("User", userSchema);
export default userModel;