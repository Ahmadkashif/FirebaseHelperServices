const express = require("express");
const axios = require('axios').default;
const bodyParser = require("body-parser");
const app = express();
const incriptionKey = "TTOYeah";
const CryptoJS = require("crypto-js");
const redis = require("redis");
const client = redis.createClient(6379);
const firebase = require("firebase/app");
require("firebase/database");
let appInfo;
let appCount;

const arrayToOBJ = (arr) => {

}
function enc(plainText){
    var b64 = CryptoJS.AES.encrypt(plainText, incriptionKey).toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    
    return eHex;
}
function dec(cipherText){
    var reb64 = CryptoJS.enc.Hex.parse(cipherText);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, incriptionKey);
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
}


const checkCache = (req,res,next)=>{

    let UUID = req.params.UUID;
    client.get(UUID,(err,data)=>{
        if (err)
        throw err;
        if(data !== null){
            let jsonRendered = JSON.parse(data)
            res.locals.cachedCredentials = jsonRendered;
            next();
            // res.status(201).send(jsonRendered)
        }
        else{
            next();
        }
    })
}
const getCredentialsPerUUID = (uuid)=>{
    let fetchedCredt;
    database.ref('Test Auth/Apps/'+uuid+'/appInfo').once('value')
    .then((snapshot)=>{
        fetchedCredt = snapshot.val();
        console.log(fetchedCredt)
        return fetchedCredt
    })
}

// Encrypt
const generateEncryptedURL_DB = (apikey, authDomain,dbURL, storageBucket)=>{

    // const cipherAPIKey = CryptoJS.format.Hex.encrypt(apikey, incriptionKey ).toString().replace('/','TTsash').replace('=','TTeq');    
    // const cipherAuthDomain = CryptoJS.format.Hex.encrypt(authDomain, incriptionKey ).toString().replace('/','TTsash').replace('=','TTeq');    
    // const cipherDBurl = CryptoJS.format.Hex.encrypt(dbURL, incriptionKey ).toString().replace('/','TTsash').replace('=','TTeq');    
    // const cipherstorageBuck = CryptoJS.format.Hex.encrypt(storageBucket, incriptionKey ).toString().replace('/','TTsash').replace('=','TTeq');    
    const url = enc(apikey) + "/" + enc(authDomain) + "/" + enc(dbURL) + "/"+ enc(storageBucket);
    return url;
}
// const ciphertext = CryptoJS.AES.encrypt('my message', incriptionKey ).toString();

const paramDecryptor = (ciphertext)=>{
    // const bytes  = CryptoJS.format.Hex.decrypt(ciphertext, incriptionKey);
    dec(ciphertext);
    // const originalText = bytes.toString(CryptoJS.enc.Utf8).replace('TTsash','/').replace('TTeq','=');
    // return originalText;
}
// Decrypt
// const bytes  = CryptoJS.AES.decrypt(ciphertext, incriptionKey);
// const originalText = bytes.toString(CryptoJS.enc.Utf8);

var firebaseConfig = {
    apiKey: "AIzaSyCUFu1sJ8RXO4rd0ONmC3IY24d-8z_7u90",
    authDomain: "tt-firebase-back-end-stack.firebaseapp.com",
    databaseURL: "https://tt-firebase-back-end-stack.firebaseio.com",
    projectId: "tt-firebase-back-end-stack",
    storageBucket: "tt-firebase-back-end-stack.appspot.com",
    messagingSenderId: "694374768925",
    appId: "1:694374768925:web:6dc718d98dec1de01ec1f4",
    measurementId: "G-D29FV04KGV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

app.use(bodyParser.urlencoded({extended:true}));
//app.use(session({...}));
app.use(express.static("public"));
//app.use(flash(app));

app.set("view engine","ejs");

app.post("/appName/:cipherAPIKey/:cipherAuthDomain/:cipherDBurl/:cipherstorageBuck", (req, res) => {

});

app.post("/addApp", (req, res)=>{

    let APPlist = [];
    
    let ts = Date.now();
    let Appcount;
    var DynamicUUID = ts ;
    appInfo = req.body.configData;
    let name = req.body.configData.appName;
    let APIkey = req.body.configData.APIkey;
    let authDomain = req.body.configData.authDomain;
    let dbURL = req.body.configData.databaseURL;
    let projectID = req.body.configData.projectID;
    let storageBucket = req.body.configData.storageBucket;
    let messagingSenderId = req.body.configData.messagingSenderId;
    let appID = req.body.configData.appID;
    let authService,dbService;

    if(req.body.configData.auth)
    authService = req.body.configData.auth;
    else
    authService = false;

    if(req.body.configData.DB)
    dbService = req.body.configData.DB;
    else
    dbService = false;

    const DBurl = "http://localhost:4041/" + generateEncryptedURL_DB(APIkey, authDomain, dbURL, storageBucket);
    
    database.ref('Test Auth/appCount/data').once('value')
    .then((snapshot)=>{
      DynamicUUID += "_" + snapshot.val().toString();
      Appcount = snapshot.val();
      
    }).then(()=>{
        console.log(DynamicUUID);
        console.log(appInfo);
        // DynamicUUID += ts;
    database.ref('Test Auth/Apps/'+ DynamicUUID ).set({
        appInfo:{
            "UUid": DynamicUUID,
            "appName":name, 
            "APIkey":APIkey,
            "authDomain": authDomain,
            "dbURL":dbURL,
            "projectID": projectID,
            "storageBucket":storageBucket,
            "messagingSenderId":messagingSenderId,
            "appID":appID,
            "GeneratedURL_DB": DBurl,
            "authService": authService,
            "dbService" : dbService
        }
         }
        );
    }).then(()=>{
        database.ref('Test Auth/appList/'+ Appcount).set({
            "appName":name, 
            "UUid": DynamicUUID
        })
    }).then(()=>{
        Appcount++;
        database.ref('Test Auth/appCount').update(
            {data:Appcount}
        )
    })

    return res.status(200).render("ProjectDetails.ejs",{
        appData:appInfo,
        UUID : DynamicUUID
    })
});

app.post("/Auth/Facebook/:UUID", (req,res)=>{

})

app.get("/", (req,res)=>{
    res.render("home")
});

app.get("/addProject", (req, res)=>{
    res.render("AddProject");
});

app.get("/manageProducts", (req, res)=>{
    let allApps;
    database.ref('Test Auth/appList').once('value')
    .then((snapshot)=>{
        allApps = snapshot.val();
    }).then(()=>{
        console.log(allApps);
        return res.status(200).render("manageAppsPage",{
            data : allApps
        });
    })
})

app.get("/view/:UUid", (req, res)=>{
    let viewData;
    database.ref('Test Auth/Apps/' + req.params.UUid + '/appInfo').once('value')
    .then((snapshot)=>{
        viewData = snapshot.val();
        res.status(200).render("ViewAppDetails",{
            appData:viewData
        })
    })
})

app.get("/DBview/:UUid", (req,res)=>{


    var viewData;
    var response
    var thrownData
    database.ref('Test Auth/Apps/' + req.params.UUid + '/appInfo').once('value')
    .then((snapshot)=>{
    viewData = snapshot.val();
    console.log(viewData)
    
    }).then(()=>{
        
            response = axios.post('http://localhost:4041/postData', viewData).then((resp)=>{
                thrownData = JSON.stringify(resp.data)
                res.status(200).render("DBview", {
                    appData:thrownData
                });
                // console.log(resp.data)
            });
        
    })
//     const DBconfig = 
//     {
//     apiKey:APIkey,
//     authDomain: authDOm,
//     databaseURL: dbUrl,
//     projectId: projID,
//     storageBucket: storage
// }
// firebase.initializeApp(DBconfig);
// var databaseForFetch = firebase.database();
// databaseForFetch.ref('/').once('value')
//     .then((snapshot)=>{
//         const viewData2 = snapshot.val();
//         res.status(200).render("DBview",{
//             appData:viewData2
//         })
//     });

})

app.get("/dbAccess/:UUID", checkCache,(req,res)=>{

    if(res.locals.cachedCredentials != null){
        console.log("cache hit")
        let postData = res.locals.cachedCredentials;
        console.log("post Data :", postData)
        let thrownData;
        // const {APIkey , dbURL, storageBucket ,authDomain,projectID, appID} = res.locals.cachedCredentials;
        let response = axios.post('http://localhost:4041/dbAccess', postData)
        .then((resp)=>{
            thrownData = JSON.stringify(resp.data)
            res.send(thrownData);
        }).catch((err)=>{
        })
    }
    else{
        console.log("first hit")
        let UUID = req.params.UUID;
        let fetchedCredt;
        database.ref('Test Auth/Apps/'+UUID+'/appInfo').once('value')
        .then((snapshot)=>{
            fetchedCredt = snapshot.val();
            // console.log(typeof fetchedCredt)
            // res.status(201).send(fetchedCredt);
        }).then(()=>{
            let thrownData;
            let postData = fetchedCredt
            console.log("fetched credentials from portal ")
            console.log(postData)
            // const {APIkey , dbURL, storageBucket ,authDomain,projectID, appID} = res.locals.cachedCredentials;

            let response = axios.get('http://localhost:4041/dbAccess', postData)
            .then((resp)=>{
                thrownData = JSON.stringify(resp.data)
                res.send(thrownData);
                console.log("Success from Portal side")
            }).catch((err)=>{
            })
        })
        .then(()=>{
            fetchedCredt = JSON.stringify(fetchedCredt)
            client.setex(UUID,3600,fetchedCredt)
        })
    }
})




app.listen(4040, ()=>{
    console.log("TT portal server started at 4040");
});

// function traverse(x) {
//     if (isArray(x)) {
//       traverseArray(x)
//     } else if ((typeof x === 'object') && (x !== null)) {
//       traverseObject(x)
//     } else {

//     }
//   }
  
//   function traverseArray(arr) {
//     arr.forEach(function (x) {
//       traverse(x)
//     })
//   }
  
//   function traverseObject(obj) {
//     for (var key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         traverse(obj[key])
//       }
//       else{
//           console.log(obj[key])
//       }
//     }
//   }
  
//   function isArray(o) {
//     return Object.prototype.toString.call(o) === '[object Array]'
//   }
  
//   // usage:
//   traverse(largeObject)