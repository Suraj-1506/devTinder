const express = require('express');

const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth")

//GET /users => It check all the app.xxx("matching route") functions
// app.use("/",(req, res, next)=>{
//     // res.send("Handelend / routes");
//     next()
// })
// app.get(
//     "/user",
//     (req, res, next) => {
//         console.log("Handeling /user route");
//         next();
//     },
//     (req, res, next) => {
//         next();
//     },
//     (req, res, next) => {
//         res.send("2nd route handler");
//     }
// )


//handle auth middleware for GET,POST
app.use("/admin",adminAuth)
app.post("/user/login",(req,res,next)=>{
    res.send("User loggedin successfully!.")
})
app.get("/user/data",userAuth,(req,res,next)=>{
    res.send("User data Sent.")
})
app.get("/admin/getAllData",(req,res,next)=>{
    res.send("All data Sent")
})
app.get("/admin/deleteUser",(req,res,next)=>{
    res.send("Deleted a user")
})
app.listen(3000, () => {
    console.log("Server is successfully listning on port 3000...")
})