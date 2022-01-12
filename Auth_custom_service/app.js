const express = require("express")
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get("/",(req, res)=>{

});

app.post("/", (req, res)=>{
    req.body
})

app.listen(4444,()=>{
    console.log("custom Auth server running at 4444 ");
})