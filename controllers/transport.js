const Transport = require('../models/transport');
const getFutureDates = require("../helpers/getFutureDates");

exports.getTransports = async (req, res, next) => {
  const today = new Date();
  let tommorow = new Date();
  tommorow = tommorow.setDate(today.getDate() + 1);
  tommorow = new Date(tommorow);
 
  const transports = await Transport.find({date: {$gte: today, $lte: tommorow}});
 
  const days = ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"];
  res.render('transport/transports', {
    pageTitle: "Превози",
    path: '/transports',
    isLoggedIn: req.session.isLoggedIn,
    transports,
    today,
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
  const time = req.body.time;
  const price = req.body.price;
  const passengers = req.body.passengers;
  const vechile = req.body.vechile;
  const phone = req.body.phone;
  const comment = req.body.comment;
  const userId = req.user;

  let onlyDate = date.replace(/[^0-9.]/g, "");
  const reversed = onlyDate.split(".").reverse().join(".");
  date = new Date(reversed);
  date.setDate(date.getDate() + 1)
  
  
  const transport = new Transport({
    type,
    from,
    to,
    date,
    price,
    passengers,
    time,
    vechile,
    phone,
    comment,
    userId
  });
  await transport.save();
  res.redirect('/')
}

exports.searchTransport = async(req, res, next) => {
  let from = "";
  let to = "";
  from = req.body.from;
  to = req.body.to;
  let transports = "";
  if (from.length > 0 && to.length <= 0) {
     transports = await Transport.find({from});
  } else if(from.length <= 0 && to.length > 0) {
     transports = await Transport.find({to});
  } else {
    transports = await Transport.find({from, to});
  }
  const d = new Date();
  const days = ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"];
  res.render('transport/transports', {
    pageTitle: "Превози",
    path: '/transports',
    isLoggedIn: req.session.isLoggedIn,
    transports,
    d,
    days
  });  
}