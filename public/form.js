
function toggleRegisterform(){
    let startButton= document.querySelector(".get-start");

//..... display control of register form


    let registerForm_wapper=document.querySelector(".register-form-wrapper");
    let formContainer = document.querySelector("#form-container");
    if (formContainer.classList.contains("form-container-show")) {
        formContainer.classList.remove("form-container-show");
        formContainer.classList.add("form-container-hide");
        registerForm_wapper.style.display="none";
        console.log(registerForm_wapper);
        
    } else {
        formContainer.classList.remove("form-container-hide");
        formContainer.classList.add("form-container-show");
        registerForm_wapper.style.display="flex";
    }

}



window.onload = toggleRegisterform;


//..... display control of login form

document.addEventListener("DOMContentLoaded", function() {
    // Call the function to set up event listener for login form toggle button
    toggleLoginForm(); 
});

function toggleLoginForm() {
    const loginFormContainer = document.getElementById('login-form-container');
    
        console.log("hello")
        if (loginFormContainer.classList.contains("loginForm-container-show")) {
             loginFormContainer.classList.add("loginForm-container-hide");
           loginFormContainer.classList.remove("loginForm-container-show");
            console.log("login form container", loginFormContainer)
        } else {
            loginFormContainer.classList.remove("loginForm-container-hide");
            loginFormContainer.classList.add("loginForm-container-show");
           // console.log("login form container else", loginFormContainer)
        }
   
}

//.........togggle add habits form
function toggleAddHabitForm(){
    const addHabitForm= document.querySelector(".add-habits-formContainer");
    const addForm= document.querySelector(".add-habitsForm");
    console.log("add habit form toggling: ", addHabitForm);

    if(addHabitForm.classList.contains("add-habits-formContainer-hide")){
        addHabitForm.classList.remove("add-habits-formContainer-hide");
        addHabitForm.classList.add("add-habits-formContainer-show");
        addForm.style.display="flex";
    }else{
        addHabitForm.classList.add("add-habits-formContainer-hide");
        addHabitForm.classList.remove("add-habits-formContainer-show");
        addForm.style.display="none";
    }

}

window.onload = toggleAddHabitForm;
//.......toggle send OTP form
function toggleSendOtpForm(){
    let sendMailContailer = document.querySelector(".send-mailContailer");
    let sendMailBox_Wrapper = document.querySelector(".send-mailBox");
    const getStartButton = document.querySelector('.get-start');

    if(sendMailContailer.classList.contains("send-mailContailer-show")){
        sendMailContailer.classList.remove("send-mailContailer-show");
        sendMailContailer.classList.add(".send-mailContailer-hide");
        sendMailBox_Wrapper.style.display="none";
        getStartButton.classList.remove("hidden");
    } else {
        sendMailContailer.classList.add("send-mailContailer-show");
        sendMailContailer.classList.remove(".send-mailContailer-hide");
        sendMailBox_Wrapper.style.display="flex";
        getStartButton.classList.add("hidden")
    }
}

window.onload=toggleSendOtpForm;


