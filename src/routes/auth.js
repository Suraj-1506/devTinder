const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        //validation of data
        validateSignUpData(req);
        //Encrypt the password
        const { firstName, lastName, emailId, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10);
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

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {
            //create a JWT Token
            const token = await user.getJWT();
            //Add the token to cookie and send response back to the user
            res.cookie("token", token,{expires: new Date(Date.now()+8*3600000)})
            res.send("Login Successful!!!")
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
});

authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token",null,{
            expire:new Date(Date.now()),
        })
        res.send("logout Successfully!")
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})

module.exports = authRouter;