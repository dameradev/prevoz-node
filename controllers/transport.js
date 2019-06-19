const Transport = require('../models/transport');

exports.getCreateTransport = (req, res, next) => {
  const userId = req.user;

  res.render('transport/create-transport', {
    pageTitle: "Додај Превоз",
    path: '/create-transport',
    isLoggedIn: req.session.isLoggedIn,
    userId
  })
}


exports.postCreateTransport =  (req, res, next) => {
  
}