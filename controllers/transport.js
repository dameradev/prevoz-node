const Transport = require('../models/transport');
const getFutureDates = require("../helpers/getFutureDates");

exports.getTransports = async (req, res, next) => {
  const transports = await Transport.find({});
  
  res.render('transport/transports', {
    pageTitle: "Превози",
    path: '/transports',
    isLoggedIn: req.session.isLoggedIn,
    transports,
    days
  });  
}

exports.getTransport = async (req, res, next) => {
  const id = req.params.id;
  const transport = await Transport.findById({ _id: id });
  res.render('transport/transport-details', {
    pageTitle: "Превози",
    path: '/transports',
    isLoggedIn: req.session.isLoggedIn,
    transport
  });
}



exports.getCreateTransport = (req, res, next) => {
  const userId = req.user;
  const days = ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"];
  const dates = getFutureDates();
  

  res.render('transport/create-transport', {
    pageTitle: "Додај Превоз",
    path: '/create-transport',
    isLoggedIn: req.session.isLoggedIn,
    userId,
    dates,
    days
  })
}


exports.postCreateTransport =  async (req, res, next) => {
  const type = req.body.type;
  const from = req.body.from;
  const to = req.body.to;
  let date = req.body.date;
  const price = req.body.price;
  const passengers = req.body.passengers;
  const vechile = req.body.vechile;
  const phone = req.body.phone;
  const comment = req.body.comment;
  const userId = req.user;


  const transport = new Transport({
    type,
    from,
    to,
    date,
    price,
    passengers,
    vechile,
    phone,
    comment,
    userId
  });
  await transport.save();




  res.redirect('/')
}