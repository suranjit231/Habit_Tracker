import mongoose from "mongoose";
import userModel from "../model/userSchema.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import otpModel from "../model/otpSchema.js";

export default class UserRepository{

    //..... user register
   async registerUser(userData){
    try{
        const newUser = new userModel(userData);
        const savedUser=await newUser.save();
        return {success:true, msg:"registration sucessfull!"};

    }catch(error){
        if (error.code === 11000 && error.keyPattern.email) {
            // If the error is due to a duplicate email
            throw new Error("Email already exists. Please choose a different email.");
        } else {
            // For other errors, log the error and throw a generic error message
            console.log(error);
            throw new Error("Something went wrong.");
        }
    }
       
   }

   //... user login
   async loginUser(email, password){
    try{
        const user= await userModel.findOne({email:email});
        if(!user){
            return {success:false, msg:"No user find with this email ID"}
        }
        if(user.password!=password){
            return {success:false, msg:"Invalid password!"};
        }

        return {success:true, user:user};

    }catch(error){
        throw new Error("Something went wong..")
    }
   }


   //.........send otp in repositroy
   async sendOtp(email){
    try{
       const user= await userModel.findOne({email:email});

       if(!user){
        return {success:false, msg:"No user found with this email"}
       }

       const otp= otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: "codingninjas2k16@gmail.com",
                pass: "slwvvlczduktvhdj",
            }
        });

        //.. create options for sending sending otp via email
        const mailOptions = {
            from:"codingninjas2k16@gmail.com",
            to:"namasudrasuranjit164@gmail.com",//.... it will replaced by user actual email id
           // to:user.email,
            subject:"Password reset OTP",
            text: `Your OTP for password reset is: ${otp}`
            

        }
        //.. send mail
        await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully");
         //. check is there any existing otp of user
        const existingOtp =await otpModel.findOne({ user: user._id });
        console.log("find existing OTP: ", existingOtp)

        if(!existingOtp){
            const newOtp = new otpModel({
                otp:otp,
                status:"send",
                user:user._id,
            });
    
            await newOtp.save();
            user.otp=newOtp._id;
            await user.save();

        }else{
                existingOtp.otp = otp;
                existingOtp.status = "send";
                await existingOtp.save();
                user.otp=existingOtp._id;
                await user.save();
        }

        

        return {success:true, msg:"OTP sends your regester email ID", otpDocs:existingOtp};

       


    }catch(error){
        console.log("error for send otp in user-repo: ",error);
    }
   }


   //....verify otp
   async verifyOtp(email, password,confirmPassword,otp,otpDocsId){
    try{
        const existingOtp = await otpModel.findOne({_id:otpDocsId});

        if(!existingOtp){
            return {success:false, msg:"There is no otp send please resend OTP!"};
        }

        //.. if otp found then verify the otp
        console.log("existing OTP:", existingOtp);
        console.log("sending otp: ", otp);
        otp=Number(otp);
        if(existingOtp.otp===otp){
            existingOtp.status = "verified";
            await existingOtp.save();

            const updateResult=await userModel.findOneAndUpdate({otp:otpDocsId, email:email}, {password:password},{new:true});

            if (!updateResult) {
                console.log("No document found matching the criteria.");
              } else {
                console.log("updateResult: ", updateResult);
                await otpModel.deleteOne({_id:otpDocsId});
                await userModel.updateOne({ otp: otpDocsId }, { $unset: { otp: "" } });

            return {success: true, msg: "OTP verified and password updated!"};
         }
        }else {
           return {success:false, msg:"Invalid OTP"};
        }


    }catch(error){
        console.log("Error verifying OTP: ", error);
        throw error;
    }
   }


}
