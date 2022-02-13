const functions = require("firebase-functions");
const express = require("express");
const {fireabaseApp} = require('./utils/config')
const {isSignedIn} = require("./middlewares/auth")

const app = express();

const {
  healthCheck,
  signUp,
  signIn,
  signOut,
  // updatePassword,
} = require("./routes/auth/auth");


app.use("/healthCheck", healthCheck);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post("/signOut", signOut);
app.get("/isSignedIn", isSignedIn, (req,res)=>{
  res.send("Signed In")
});

exports.api = functions.https.onRequest(app);
