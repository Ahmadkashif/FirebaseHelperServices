const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const cookieSession = require("cookie-session");
var serviceAccount = require("./serviceAccountKey.json");
var firebase = require("firebase/app");
var admin = require("firebase-admin");
require("./passportJsSetup")
require("firebase/auth");
const app = express();

var firebaseConfig = {
};
firebase.initializeApp(firebaseConfig);
app.use(cors())

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
//app.use(flash(app));

app.set("view engine","ejs");




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tt-firebase-back-end-stack.firebaseio.com"
});

const LogIn = ()=>{

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    res.status(201).send("Logged in");
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
  app.post("/", (req, res )=>{
  })

  app.get("/auth", (req, res)=>{
    res.render("home")
  })

  app.get("/", (req, res)=>{
    console.log("post hit");
    LogIn();  
  });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.listen(4000, (req, res)=>{
    console.log("Google auth service started at 4000");
})







// Client ID
// 694374768925-ba687fhm7gujbps9p4ga6s04aop6haof.apps.googleusercontent.com
// Client secret
// Flvu_OEOuDOU1cTT9k10Kdr0
// Creation date
// October 16, 2020 at 2:55:28 PM GMT+5


// Client ID
// 694374768925-ba687fhm7gujbps9p4ga6s04aop6haof.apps.googleusercontent.com
// Client secret
// Flvu_OEOuDOU1cTT9k10Kdr0
// Creation date
// October 16, 2020 at 2:55:28 PM GMT+5