const express = require("express");
const router = express.Router();

const ratingsController = require("../controllers/rating");

router.post("/rate-user", ratingsController.rateUser);

module.exports = router;
