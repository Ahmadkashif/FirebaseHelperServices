const express = require("express");
const app = express();

app.post("localhost:4040/",(req,res)=>{
    res.send("yo there")
});

app.listen(4041, ()=>{
    console.log("Server started")
})