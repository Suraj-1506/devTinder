const express = require('express');
const conncetDB = require("./config/database")
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const { userAuth } = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
        res.status(400).send("Error :" + err.message)
    }
});
app.post("/sendConnectionRequest", userAuth,async(req,res)=>{
    const user = req.user;
    console.log("Sending a connection request");
    res.send(user.firstName + " sent the connection request!")
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