const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Sign up',
    path: '/signup',
    isLoggedIn: req.session.isLoggedIn
  })
}
exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({email});

  if (user) {
    return res.redirect('/signup');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user = new User({
    email,
    password: hashedPassword
  })
  await user.save();
  res.redirect('/login');
}

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isLoggedIn: req.session.isLoggedIn
  })
}

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({email});

  if(!user) {
    res.redirect('/login');
  }

  const doMatch = await bcrypt.compare(password, user.password);

  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    res.redirect('/');
  }
}

exports.postLogout = async (req, res, next) => {
  await req.session.destroy();
  res.redirect('/login');
}