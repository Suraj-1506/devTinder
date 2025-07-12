const express = require('express');
const conncetDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.post("/signup", async (req,res)=>{
    const userObj = {
        firstName : "Sanjay",
        lastName : "Upadhyay",
        emailId : "sanjay@upadhyay.com",
        password: "sanjay@0304"
    }
    // Creating a new instance of User model
    const user = new User(userObj);
    try {
        await user.save();
        res.send("User added Successfully!!")
    } catch (err) {
        res.status(400).send("Error saving the user:"+ err.message)
    }

});

conncetDB()
    .then(() => {
        console.log("Database connection establish...");
        app.listen(3000, () => {
            console.log("Server is successfully listning on port 3000...")
        })
    })
    .catch((err) => {
        console.error("database cannot be connected!!");
    })