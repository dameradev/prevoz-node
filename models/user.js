const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  averageRating: {
    type: Number,
    required: true,
    default: 0
  }
});

userSchema.methods.addRating = function(ratingId) {
  if (this.ratings.indexOf(ratingId) === -1) {
    this.ratings.push(ratingId);
  }
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
