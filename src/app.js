const express = require('express');
const conncetDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json());

app.post("/signup", async (req,res)=>{
    // Creating a new instance of User model
    const user = new User(req.body);
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