const express = require('express');

const app = express();

app.get("/getUserData", (req, res) => {
    try {
        //logic of DB call and get user data
        throw new Error("dhddhwd")
        res.send("User data Sent.")
    } catch (error) {
        res.status(500).send("Some error contact support team.")
    }
})
app.use("/", (err, req, res, next) => {
    if (err) {
        //Log your errors
        res.status(500).send("something went wrong.")
    }
})
app.listen(3000, () => {
    console.log("Server is successfully listning on port 3000...")
})