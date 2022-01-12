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

"http://localhost:4041/53616c7465645f5f873e5b84d03618b257540cd4c9ec1d3bb10c366a4b88f62bb2a429ac5cbf6245e2bc6b3755e375cfc64e5058975923668f93e6d8e29496f5/53616c7465645f5f05ec34dd3dcfc26d6cf3de8ce978dcbea847aa3cbe2b09729056eb3e7f9caf0216ba9562257551c81a6535c84cc079d1ead7086eb987e735/53616c7465645f5f344ca515a00e919251bf01493cca2bcb090f5b6321a3bfbf8788088e27c484592c00b216b2270e6c798f1f847fb0bc321d09bca242bbdf74/53616c7465645f5fcbd37b93535ca61071ef900bb23ea443843f336088f2de756a0d2c5ee7c94ff35085ead9d7589eb8"
"http://localhost:4041/53616c7465645f5f31193fe9981f77f5f5711a1781dae9b215f0e9f3a243e025d64757276e45c2f6056af051ce72815ce29b0c997e75fadf5eacf4bb5be707f0/53616c7465645f5fd536ef77646ad3fc6bf1b9e885b3adb4540dd0046f1a67c2786422743b7cf7c6efd70adbd9fbe7a6db39acb02ffa5e603c960a4a2f67f673/53616c7465645f5fd9df0023b6af6439be768b995d765ccb4d6b69be3276cc4e062e0d12b9349649e945b4fbd5a49d77ef0af91eb1c9d988330a09d1284b27a0/53616c7465645f5f7f5a23103ef40fb9f3923ca3d975ba2d59d30076dd87c0b22da02fa86c9a87448a695443d703128a"

