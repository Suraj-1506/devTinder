const express = require('express');

const app = express();

app.use("/",(req,res)=>{  //This function is known as request handler 
    res.send("Hello from the server!")
})
app.use("/hello",(req,res)=>{  //This function is known as request handler 
    res.send("Hello Hello Hello!")
})
app.use("/test",(req,res)=>{  //This function is known as request handler 
    res.send("Testing the server!")
})
app.listen(3000,()=>{
    console.log("Server is successfully listning on port 3000...")
})