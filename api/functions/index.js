const functions = require("firebase-functions");
const express = require("express");
const {isSignedIn} = require("./middlewares/auth")
const {seedTest} = require("./utils/seedTest")

//Prevent CORS error in client
const cors = require('cors')

const app = express();

const {
  healthCheck,
  signUp,
  signIn,
  signOut,
  persistAuth,
  // updatePassword,
} = require("./routes/auth/auth");

const {
  getProfile,
  updateProfile
} = require('./routes/profile/profile')

const {
  searchSymbol,
  getWatchlist,
  saveWatchlist,
  deleteFromWatchlist
} = require("./routes/market/market")

app.use(cors())
app.get("/healthCheck", healthCheck);
app.get("/seedTest", seedTest);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.get("/signOut", signOut);
app.get("/isSignedIn", isSignedIn, (req,res)=>{
  res.send("Signed In")
});
app.post("/testPersist", persistAuth);

app.get('/profile', isSignedIn, getProfile)
app.post('/profile', isSignedIn, updateProfile)

app.post("/searchSymbol", isSignedIn, searchSymbol)
app.get("/watchlist", isSignedIn, getWatchlist)
app.post("/watchlist", isSignedIn, saveWatchlist)
app.delete("/watchlist", isSignedIn, deleteFromWatchlist)

exports.api = functions.https.onRequest(app);
