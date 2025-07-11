const express = require('express');

const app = express();

//app.use("/route", rh1, [rh2, rh3], rh4, 4h5)
//app.get("/route", rh1, [rh2, rh3], rh4, 4h5)
app.use(
    "/user",
    (req, res, next) => {
        console.log("Handeling the route user 1");
        // res.send("Response 1");
        next();
        // res.send("Response 1");
    },
    (req, res, next) => {
        console.log("Handeling the route user 2");
        // res.send("Response 2");
        next();
    },
    (req, res, next) => {
        console.log("Handeling the route user 3");
        // res.send("Response 3rd");
        next();
    },
    (req, res, next) => {
        console.log("Handeling the route user 4");
        res.send("Response 4");
        next();
    }
)
app.listen(3000, () => {
    console.log("Server is successfully listning on port 3000...")
})