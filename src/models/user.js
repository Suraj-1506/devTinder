const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email address: " + value);
                }
            }
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Enter a strong password: " + value);
                }
            }
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            enum: {
                values: ["male", "female", "others"],
                message: `{VALUES} is not a valid gender type.`
            }
            // validate(value) {
            //     if (!["male", "female", "others"].includes(value)) {
            //         throw new Error("Gender data is not valid")
            //     }
            // },
        },
        photoUrl: {
            type: String,
            default: "https://tse3.mm.bing.net/th/id/OIP.w0TcjC4y9CxTrY3sitYa_AAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Invalid photo URL: " + value)
                }
            }
        },
        about: {
            type: String,
            default: "This is a default about the user."
        },
        skills: {
            type: [String],
        }
    },
    {
        timestamps: true
    });

//index    
// userSchema.index({firstName:1,lastName:1});
// userSchema.index({gender:1});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$0304", {
        expiresIn: "7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
};
// const UserModel = mongoose.model("User",userSchema);
// module.exports = UserModel;
module.exports = mongoose.model("User", userSchema);