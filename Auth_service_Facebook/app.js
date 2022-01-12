
const express = require("express");
const passport = require("passport")
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const passportFB = require("passport-facebook")
const bodyParser = require('body-parser');
const app = express();
const axios = require("axios");
const https = require("https");
var request = require('request');

// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));



async function getFacebookUserData(access_token) {
    const { data } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        client_id: "273107797453248",
        fields: ['id', 'email', 'first_name', 'last_name'].join(','),
        accesstoken: access_token,
      },
    }).then(()=>data).catch((err)=>{
        // console.log(err.request)
    });
    // console.log(data); // { id, email, first_name, last_name }
    // return data;
};


app.get("/route1/:AccessToken",(req,res)=>{


    https.get('https://graph.facebook.com/debug_token?input_token='+ req.params.AccessToken
    , resp => {
        let data = "", status;
    // A chunk of data has been recieved.
    resp.on("data", chunk => {
      data += chunk;
    });
    resp.on("end", () => {
        if(resp.statusCode==200){
        res.send(JSON.parse(data));
        }
      else
      res.status(400).send({"status":401});
    })

})

})

app.listen(4042, ()=>{
    console.log("FB Auth Service started at 4042");
});



