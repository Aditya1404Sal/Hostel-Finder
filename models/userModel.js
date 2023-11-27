const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    name: {
        type: String,
        required: [true,"name is required "],
    },
    email: {
        type: String,
        required: [true, "email is required "],
    },
    password: {
        type: String,
        required: [true, "password is required "]
    },
    mobile: {
        type: String,
        required: [true, "mobile number is required"]
    }
});
//the schema for the data to be sent to MongoDB
const userModel = mongoose.model('user',userSchema);

module.exports = userModel;