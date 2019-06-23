const Rating = require("../models/rating");

exports.rateUser = async (req, res, next) => {
  const userId = req.body.userId;
  const rate = req.body.rate;

  let rating = await Rating.findOne({ userId });
  console.log(rating);
  if (!rating) {
    rating = new Rating({
      individualRating: rate,
      userId
    });
  } else {
    rating.individualRating = +rate;
  }
  console.log(rating);
  await rating.save();
  res.redirect(`/profiles/${userId}`);
};
