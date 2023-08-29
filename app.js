const express = require('express')
const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World')
})

//Login
app.post('/api/v1/auth/login', (req, res)=>{
  console.log(req)

  let isPasswordCOrrect =  true ;

  if(isPasswordCOrrect){
    res.send({
      "success" : true,
      "message" : "Login successful",
      "userInfo" : {
        id : 23,
        email : "a@gmail.com",
        firstname: "AdminF",
        lastname: "AdminL",
        login_token: "token",
        role : 0,
        // user_role: "user_role",
      },
    })
  } else {
    res.send({
      "success" : false,
      "message" : "Password Incorrect / Email not register"
    })
  }
});

//Send OTP
app.post('/api/v1/auth/forgetUserPassword',(req, res)=>{
  let isEmailExist = true;

  if(isEmailExist){
    res.send({
      "success" : true,
      "message" : "OTP sent successfully",
      "OTP" : 1234
    })
  } else {
    res.send({
      "success" : false,
      "message" : "Email does not exist please contact admin"
    })
  }

});

// Verify OTP
app.post('/api/v1/auth/verifyOTPForgetUserPassword',(req, res)=>{
  let isOTPCorrect = true;

  if(isOTPCorrect){
    res.send({
      "success" : true,
      "message" : "Authentication successfull, you are being directed to reset password page",
    })
  } else {
    res.send({
      "success" : false,
      "message" : "OTP Incorrect"
    })
  }

});

//Update password (reset password)
app.post('/api/v1/auth/forgetUserPasswordUpdate',(req, res)=>{
  res.send({
    "success" : true,
    "message" : "Password updated successfully",
  })
});

module.exports = app;