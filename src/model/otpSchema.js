import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp:{
        type:Number,
    },
    status:{
        type:String,
        enum:["send", "verified", "expired"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const otpModel = mongoose.model("Otp", otpSchema);
export default otpModel;