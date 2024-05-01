import UserRepository from "../repository/user.repository.js";
import HabitsRepository from "../repository/habits.repository.js";

const habitRepository = new HabitsRepository();
export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

    //..... show signUpfurm
    showSignUpForm(req,res,next){
      let error=null;
      res.render("signup", {error:error});
    }

    //.... register user methods
   async registerUser(req,res,next){
        try{
            const userData=req.body;
            console.log("req.body user register: ", userData);

            if(!userData.name.trim() || !userData.email.trim() || !userData.password.trim()){
              let error="Error empty input!";
              return res.render("signup", {error:error});
            }


            const newUser = await this.userRepository.registerUser(userData);

            if(newUser.success){
                return res.status(201).render("loginForm", {error:null});
            }

        }catch(error){
          if (error.message.includes("Email already exists")) {
            let error = "Error: Email already exists!";
            return res.render("signup", { error: error });
        } else {
            // For other errors, render a generic error message
            return res.status(500).render("error", { error: "An error occurred. Please try again later." });
        }
        }
   }

   //.......show login form
   async showLoginForm(req,res,next){
    res.status(201).render("loginForm", {error:null});
   }


   formatDate(date) {
    const options = { month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

   //.... user login methods
   async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const loginResult = await this.userRepository.loginUser(email, password);
      
  
      if (!loginResult.success) {
       return res.status(404).render("loginForm", { error: loginResult.msg });
      } else {
        req.session.email = email;
        req.session.userId=loginResult.user._id;
        req.session.name= loginResult.user;
  
        
        const habitData = await habitRepository.getAllUserHabits(loginResult.user._id);
       
        req.flash('success', 'Login successfully!');
       
        //res.status(200).render("trial_view", { email: email, user: loginResult.user, habits: habitData.allHabits, formatDate: this.formatDate,successMessage });
      }
      return res.redirect("/all-habits");


    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  //........user logout
  async userLogout(req,res,next){
    try{
      // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Internal server error');
      }
      // Redirect to the login page after successful logout
      res.status(201).render("loginForm", {error:null});
    });

    }catch(error){
      console.log("logout error: ",error);
      res.status(500).send(error.message);
    }
  }


  //....methods for sending otp for forget password
  async sendOtp(req,res,next){
    try{
      const email = req.body.email;
      if(!email.trim()){
        console.log("empty email returen")

        const otpSend = { success: false };
        return res.render("forgetPassword", {error:"Email is required!", otpSend:otpSend});
     
      }

     const result= await this.userRepository.sendOtp(email);
     if(!result.success){
        let otpSend={success:true};
        return res.render("forgetPassword", {error:result.msg, otpSend:otpSend});

     }else{

      let otpSend={success:true};
        return res.render("forgetPassword", {error:null, otpSend:otpSend, otpDocs:result.otpDocs._id});

     }

    

    }catch(error){
        console.log(error);
    }
  }

  //.... verify otp and reset password
  async verifyOtp(req,res,next){
    try{
      const {email, password,confirmPassword,otp,otpDocs  } = req.body;

      console.log("otpDocsId: ", otpDocs);
      let error = null;

      if(!email.trim() || !password.trim() || !confirmPassword.trim() || !otp.trim()){
        error ="Empty input field";
        let otpSend={success:true};
       return res.render("forgetPassword", {error:error, otpSend:otpSend,otpDocs:otpDocs});
      }

     const result= await this.userRepository.verifyOtp(email, password,confirmPassword,otp,otpDocs);

     console.log("verified result: ", result);
     if(!result.success){
      let otpSend={success:true};
      return res.render("forgetPassword", {error:null, otpSend:otpSend, otpDocs:otpDocs});

     }

     res.status(201).render("loginForm", {error:null});
      

    }catch(error){
      console.log(error);
    }
  }
  

}

