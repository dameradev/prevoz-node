const express = require("express");
const router = express.Router();
const User = require("../models/user");

const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

router.get("/profiles/:id", authController.getUserProfile);
router.get("/profile", authController.getProfile);

// router.post("/rate-user", authController.rateUser);

router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("User with this email already exists.");
          }
        });
      })
      .normalizeEmail(),
    body("name")
      .isLength({ min: 5 })
      .withMessage("Username must be atleast 5 charachters"),
    body("password")
      .isLength({ min: 5 })
      .trim()
      .withMessage("Лозинката мора да биде најмалку 5 карактери."),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password and confirm password must match!");
        }
        return true;
      })
  ],
  authController.postSignup
);

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (!userDoc) {
            return Promise.reject("Invalid email or password");
          }
        });
      }),
    body("password")
      .isLength({ min: 5 })
      .trim()
      .withMessage("Лозинката мора да биде најмалку 5 карактери.")
  ],
  authController.postLogin
);
router.post("/logout", authController.postLogout);

module.exports = router;
