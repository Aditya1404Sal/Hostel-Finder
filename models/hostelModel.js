const mongoose = require('mongoose');
const hostelSchema = new mongoose.Schema({
    hostel_id: {
        type: String
    },
    owner_id:{
        type: String
    },
    hostelName: {
        type: String
    },
    ownerName: {
        type: String
    },
    hostelAmenities: {
        type : [String]
    },
    location: {
        type: String
    },
    landmark:{
        type: String
    },
    hostelRestrictions: {
        type: [String]
    },
    pincode: {
        type: Number,
        maxlength: 6
    },
    phoneNumber: {
        type: Number,
        maxlength: 10
    },
    totalOccupancy: {
        type: Number
    },
    description:{
        type: String
    },
    vacancy:{
        type: Number
    },
    perRoomCount:{
        type: Number
    },
    roomAvailable:{
        type: Number
    },
    totalRoom :{
        type: Number
    },
    AnnualRent: {
        type: Number
    }
});
const hostelModel = mongoose.model('Hostel',hostelSchema);

module.exports = hostelModel;