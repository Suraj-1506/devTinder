const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        const allowedAtatus = ["ignored", "interested"];
        if (!allowedAtatus.includes(status)) {
            return res.status(400).json({
                message: `Invalid status Type : ${status}`
            })
        }
        //If there is an existing ConnectionRequest
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });
         if (existingConnectionRequest) {
            return res.status(400).json({
                message: `Connection Request Already Exists!!`
            })
        }
        //Restrict to send connection request to some render peron whoever not existing,
        const toUser = await user.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message: "User not found!"})
        }
        //restrict the user to send request to himself
        const data = await connectionRequest.save();
        res.json({
            message: status==="interested"?`${req.user.firstName} is interested in ${toUser.firstName}!`:`${req.user.firstName}  not ${status} in ${toUser.firstName}!`,
            data,
        })
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
});

module.exports = requestRouter;