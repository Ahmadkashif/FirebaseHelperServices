const express = require("express")
const bodyParser = require("body-parser");
const app = express();

const firebase = require("firebase/app");
require("firebase/database");
let appInfo;
let dataBuff;
var firebaseConfig = {
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post("/",(req, res)=>{
    if( req.body.token == "d59ebfd4djvn746ff839gh5a6"){
        res.status(201).send("auth granted")
    }
    else{
        res.status(200).send("auth not granted")
    }
})

app.post("/custSignup", (req, res)=>{

    dataBuff = req.body.incomingData;

})

app.listen(4042, ()=>{
    console.log("auth server started at 4042");
})