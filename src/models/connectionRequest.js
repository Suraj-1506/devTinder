const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ['ignored', 'interested', 'accepted', 'rejected'],
                message: `{VALUE} is incorrect status type`
            }
        }
    },
    {
        timestamps: true
    }
);
//compound index
connectionRequestSchema.index({fromUserId:1, toUserId:1})
//this is not mandatory to check in schema leave you can check the same thing in api level also.
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    //check if the fromUserId and toUserId are same?
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send the connection request to yourself!")
    }
    next();
})
const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;