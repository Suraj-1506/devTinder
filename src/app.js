const express = require('express');
const conncetDB = require("./config/database")
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

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