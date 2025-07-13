const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password: {
        type: String,
        required:true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        },
    },
    photoUrl:{
        type: String,
        default: "https://www.bing.com/images/search?view=detailV2&ccid=w0TcjC4y&id=3EAEE0D2954752D941E01FEAE1AB90C9F86EE995&thid=OIP.w0TcjC4y9CxTrY3sitYa_AAAAA&mediaurl=https%3a%2f%2fmed.gov.bz%2fwp-content%2fuploads%2f2020%2f08%2fdummy-profile-pic.jpg&exph=400&expw=400&q=dummy+user+full+photo&simid=608044048885174364&FORM=IRPRST&ck=744D5BD6E65CC26A71686A52E2756DE7&selectedIndex=0&itb=0&idpp=overlayview&ajaxhist=0&ajaxserp=0"
    },
    about:{
        type: String,
        default: "This is a default about the user."
    },
    skills:{
        type:[String],
    }
},
{
    timestamps: true
});

// const UserModel = mongoose.model("User",userSchema);
// module.exports = UserModel;
module.exports = mongoose.model("User",userSchema);