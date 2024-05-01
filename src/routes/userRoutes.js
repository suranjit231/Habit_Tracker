import express from "express";
import UserController from "../controller/user.controller.js";
import HabitController from "../controller/habits.controller.js"
import { auth } from "../authentication/auth.middleware.js";
const routes=express.Router();
const userController = new UserController();
const habitController = new HabitController();

routes.get("/signup", (req,res,next)=>{
    userController.showSignUpForm(req,res,next);
})

routes.post("/register", (req,res,next)=>{
    userController.registerUser(req,res,next);
});

routes.post("/signin", (req,res,next)=>{
    userController.loginUser(req,res,next);
});

routes.get("/signin", (req,res,next)=>{
    userController.showLoginForm(req,res,next);
});

routes.get("/user-logout", (req,res,next)=>{
    userController.userLogout(req,res,next);
})

routes.get("/forget-passoword", (req,res,next)=>{
    const otpSend = { success: false };
    res.render("forgetPassword", {error:null, otpSend:otpSend});
});

routes.post("/get-otp", (req,res,next)=>{
    userController.sendOtp(req,res,next);
});

routes.post("/verify-otp", (req,res,next)=>{
    userController.verifyOtp(req,res,next);
})


//............router for habits......................//



routes.post("/add-habits", auth, (req,res,next)=>{
    habitController.addHabits(req,res,next);
})

routes.post('/update-status',(req,res,next)=>{
    habitController.updateStatus(req,res,next)
});

routes.post("/update-habit", (req,res,next)=>{
    // console.log("updated dabits data req.body: ", req.body);
    habitController.updateHabits(req,res,next);
})

routes.get("/all-habits", auth, (req,res,next)=>{
    habitController.getAllUserHabits(req,res,next);
});

routes.get("/delete-habits", auth, (req,res,next)=>{
    habitController.deleteHabits(req,res,next);
});

routes.get("/show-daily", auth, (req,res,next)=>{
    habitController.showDailyHabits(req,res,next);
})


routes.get("/getHabitById/:habitId", (req,res,next)=>{
    habitController.getHabitsById(req,res,next);
    
})



export default routes;