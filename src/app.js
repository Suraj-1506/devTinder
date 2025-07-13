const express = require('express');
const conncetDB = require("./config/database")
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        //validation of data
        validateSignUpData(req);
        //Encrypt the password
        const {firstName, lastName, emailId, password} = req.body
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)
        // Creating a new instance of User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save();
        res.send("User added Successfully!!")
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }

});
app.post("/login",async (req,res)=>{
    try {
         const {emailId, password} = req.body;
         const user = await User.findOne({emailId:emailId})
         if(!user){
            throw new Error("Invalid Credentials")
         }
         const isPasswordValid = await bcrypt.compare(password, user.password)
         if(isPasswordValid){
            res.send("Login Successful!!!")
         }else{
            throw new Error("Invalid Credentials")
         }
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})
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
//Delete a user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        // const user = await User.findByIdAndDelete({ _id: userId })
        const user = await User.findByIdAndDelete(userId)
        res.send("User Deleted Successfully!!");
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})
//update data of the user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    console.log(userId)
    const data = req.body
    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        )
        if (!isUpdateAllowed) {
            throw new Error("Update now allowed")
        }
        if (data?.skills?.length > 10) {
            throw new Error("Skills cannot be more than 10")
        }
        //const user = await User.findByIdAndUpdate(userId,data, {returnDocument: "after"});
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true
        });
        // console.log(user)
        res.send("User updated Successfully!!");
    } catch (err) {
        res.status(400).send("UPDATE FAILED: " + err.message)
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