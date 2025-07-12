const express = require('express');
const conncetDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json());

app.post("/signup", async (req, res) => {
    // Creating a new instance of User model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added Successfully!!")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

});
//Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        //findOne - it gives the first match
        // const user = await User.findOne({ emailId: userEmail })
        // if(!user){
        //     res.status(404).send("User not found")
        // }else{
        //     res.send(user);
        // }
        
        //find - it gives the all match
        const user = await User.find({ emailId: userEmail })
        if (user.length === 0) {
            res.status(404).send("User not found")
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})
//Feed API - GET /feed - get all the user from the database
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

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