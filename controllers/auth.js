const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validationResult } = require("express-validator/check");

exports.getProfile = (req, res, next) => {
  const user = req.session.user;

  res.render("auth/profile", {
    pageTitle: "Профил",
    path: "/profile",
    isLoggedIn: req.session.isLoggedIn,
    user
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/signup", {
    pageTitle: "Sign up",
    path: "/signup",
    isLoggedIn: req.session.isLoggedIn,
    errorMessage: message,
    oldInput: { email: "", name: "", password: "", confirmPassword: "" },
    validationErrors: []
  });
};
exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("auth/signup", {
      pageTitle: "Sign up",
      path: "/signup",
      isLoggedIn: req.session.isLoggedIn,
      errorMessage: errors.array()[0].msg,
      oldInput: { email, name, password, confirmPassword },
      validationErrors: errors.array()
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    email,
    name,
    password: hashedPassword
  });
  await user.save();
  res.redirect("/login");
};

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isLoggedIn: req.session.isLoggedIn
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({ email });

  if (!user) {
    res.redirect("/login");
  }

  const doMatch = await bcrypt.compare(password, user.password);

  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    res.redirect("/");
  }
};

exports.postLogout = async (req, res, next) => {
  await req.session.destroy();
  res.redirect("/login");
};
