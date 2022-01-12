//37404014ak
const firebase = require("firebase/app");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

require("firebase/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

let data;
let extracted;

app.post("/", (req,res)=>
{
    console.log("post requested");
    data = req.body
    database.ref('Usman iOS').set({
        data
         }, 
         function(error) {
         if (error) {
           // The write failed...
           console.log("error" + error);
           res.send("error");
         } else {
           // Data saved successfully!
           console.log("Data saved successfully!");
           res.send("Data saved successfully!");
         }
       });
});

app.post("/postData", (req, res)=>{
  let data = req.body;
  
  let firebaseConfig = {
    apiKey: req.body.APIkey,
    authDomain: req.body.authDomain,
    databaseURL: req.body.dbURL,
    projectId: req.body.projectID,
    storageBucket: req.body.storageBucket,
    appId: req.body.appID,
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  database.ref('/').once('value')
    .then((snapshot)=>{
      extracted = snapshot.val()
      console.log("from the reaquested")
      console.log(extracted);
      res.status(200).send(extracted)
    }).catch(()=>{
      res.status(400).send("sorry problem while retrieving info from requested DB")
    })
})




let tempDbAccess;

app.post("/dbAccess", (req, res)=>{

  console.log(req.body);
  
  const {APIkey , dbURL, storageBucket ,authDomain,projectID, appID} = req.body;
  let firebaseConfig = {
    apiKey: APIkey,
    authDomain: authDomain,
    databaseURL: dbURL,
    projectId: projectID,
    storageBucket: storageBucket,
    appId: appID,
  };

  // Initialize Firebase
  if(tempDbAccess != APIkey){
    console.log(tempDbAccess !== APIkey);
    firebase.initializeApp(firebaseConfig);
    tempDbAccess = APIkey;  
  }
  else{

  }
  
  var database = firebase.database();
  database.ref('/').once('value')
    .then((snapshot)=>{
      extracted = snapshot.val()
      console.log("from the reaquested")
      console.log(extracted);
      res.status(200).send(extracted)
    }).catch(()=>{
      res.status(400).send("sorry problem while retrieving info from requested DB")
    })
})











app.get("/", (req,res)=>
{
    database.ref('Usman iOS').once('value')
    .then((snapshot)=>{
      extracted = snapshot.val()
      res.send(extracted);
    })
});

app.listen(4041, ()=>{
    console.log("DataBase Service started at 4041");
});

