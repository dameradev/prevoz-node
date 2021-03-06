const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  comment: {
    type: String
  },
  individualRating: {
    type: Number,
    required: true,
    default: 0
  },
  currentUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Rating", ratingSchema);

// function getAverage(arr) {
//   const sum = arr.reduce(function(a, b) {
//     return a + b;
//   });
//   const avg = sum / arr.length;
//   return avg;
// }

// userSchema.methods.rate = function(userId, rating) {
//   const userPos = this.ratings.userIds.indexOf(userId);
//   const oldRating = this.ratings.individualRatings[userPos];
//   if (this.ratings.userIds.indexOf(userId) === -1) {
//     this.ratings.userIds.push(userId);
//     this.ratings.individualRatings.push(rating);
//   } else {
//     this.ratings.individualRatings.remove(oldRating);
//     this.ratings.individualRatings.push(rating);
//   }

//   if (this.ratings.averageRating === 0) {
//     this.ratings.averageRating += rating;
//   } else {
//     this.ratings.averageRating = getAverage(this.ratings.individualRatings);
//   }

//   console.log(this.ratings.individualRatings);
//   return this.save();
// };
