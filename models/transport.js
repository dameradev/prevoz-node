const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transportSchema = new Schema({
  type: {
    type: String,
    enum: ["offer", "seek"],
    default: "offer",
    required: true
  },
  from: {
    type: String
    // required: true
  },
  countryFrom: {
    type: String,
    default: "Македонија"
  },
  to: {
    type: String
    // required: true
  },
  countryTo: {
    type: String,
    default: "Македонија"
  },
  date: {
    type: Date
    // required: true
  },
  time: {
    type: Date
  },
  price: {
    type: Number
    // required: true
  },
  passengers: {
    type: String
    // required: true
  },
  vechile: {
    type: String
    // required: true
  },
  phone: {
    type: String
    // required: true
  },
  comment: {
    type: String
    // required: true
  },

  userId: {
    type: mongoose.Types.ObjectId,
    // required: true,
    ref: "User"
  }
});

module.exports = mongoose.model("Transport", transportSchema);
