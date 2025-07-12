const mongoose = require("mongoose");

const conncetDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Suraj:g2KnDNUE7iGV7u8l@cluster0.athpyhz.mongodb.net/devTinder"
    );
}

module.exports = conncetDB