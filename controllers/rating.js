const Rating = require("../models/rating");
const User = require("../models/user");

exports.rateUser = async (req, res, next) => {
  const userId = req.body.userId;
  const rate = req.body.rate;
  const currentUserId = req.user._id;

  const user = await User.findById(userId);
  let rating = await Rating.findOne({ userId, currentUserId });

  if (!rating) {
    rating = new Rating({
      individualRating: rate,
      currentUserId: currentUserId,
      userId
    });
    await user.addRating(rating._id);
  } else {
    rating.individualRating = +rate;
    await user.addRating(rating._id);
  }

  await rating.save();
  res.redirect(`/profiles/${userId}`);
};
