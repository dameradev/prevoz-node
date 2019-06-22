const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");

router.get("/profile", authController.getProfile);

router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail()
  ],
  authController.postSignup
);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);

module.exports = router;
