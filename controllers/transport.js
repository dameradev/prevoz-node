const Transport = require('../models/transport');

exports.getTransports = async (req, res, next) => {
  const transports = await Transport.find({});
  const days = ["Четврток", "Петок", "Сабота", "Недела", "Понеделник", "Вторник", "Среда"];
  res.render('transport/transports', {
    pageTitle: "Превози",
    path: '/transports',
    isLoggedIn: req.session.isLoggedIn,
    transports,
    days
  })  
}



exports.getCreateTransport = (req, res, next) => {
  const userId = req.user;

  res.render('transport/create-transport', {
    pageTitle: "Додај Превоз",
    path: '/create-transport',
    isLoggedIn: req.session.isLoggedIn,
    userId
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

  date = new Date(date)
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