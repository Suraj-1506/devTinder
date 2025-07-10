const express = require('express');

const app = express();
// Route: matches "/ac" and "/abc"
// app.get(/^\/ab?c$/,(req,res)=>{
//     res.send({firstName:"Suraj",lastName:"Upadhyay"})
// })

// Route: matches "/abbbc" and "/abc"
// app.get(/^\/ab+c$/,(req,res)=>{
//     res.send({firstName:"Suraj",lastName:"Upadhyay"})
// })

// Route: matches "/abbbc" and "/abc" "ac"
// app.get(/^\/ab*c$/,(req,res)=>{
//     res.send({firstName:"Suraj",lastName:"Upadhyay"})
// })

//query
// app.get("/user",(req,res)=>{
//     console.log(req.query);
//     res.send({firstName:"Suraj",lastName:"Upadhyay"});
// })

//params
// app.get("/user/:userId",(req,res)=>{
//     console.log(req.params);
//     res.send({firstName:"Suraj",lastName:"Upadhyay"});
// })
app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Suraj",lastName:"Upadhyay"});
})
app.listen(3000,()=>{
    console.log("Server is successfully listning on port 3000...")
})