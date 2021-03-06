const Transport = require("../models/transport");
const getFutureDates = require("../helpers/getFutureDates");
const stringToDate = require("../helpers/stringToDate");
const getTomorrow = require("../helpers/getTomorrow");
const postedAgoInHours = require("../helpers/postedAgoInHours");

// DECLARING VARIABLES FOR DAYS IN MACEDONIAN
// DIFFERENT FOR SEARCHING AND DISPLAYING
const days = [
  "Сабота",
  "Недела",
  "Понеделник",
  "Вторник",
  "Среда",
  "Четврток",
  "Петок"
];
const sdays = [
  "Недела",
  "Понеделник",
  "Вторник",
  "Среда",
  "Четврток",
  "Петок",
  "Сабота"
];
const countries = [
  "Македонија",
  "Грција",
  "Бугарија",
  "Србија",
  "Хрватска",
  "БиХ",
  "Црна Гора",
  "Словенија",
  "Австрија",
  "Германија"
];

exports.getTransports = async (req, res, next) => {
  let today = new Date();

  const transports = await Transport.find({ date: { $gte: today } }).sort({
    date: 1,
    time: 1
  });

  const dates = getFutureDates(); // GETTING DATES FROM TODAY UP ONE YEAR

  res.render("transport/transports", {
    pageTitle: "Превози",
    path: "/transports",
    isLoggedIn: req.session.isLoggedIn,
    transports,
    today,
    days,
    sdays,
    dates
  });
};

exports.getTransport = async (req, res, next) => {
  const id = req.params.id;
  const transport = await Transport.findById({ _id: id }).populate("userId");
  let postedAgo = transport._id.getTimestamp();
  let postedAgoInWords = postedAgoInHours(postedAgo);

  res.render("transport/transport-details", {
    pageTitle: "Превози",
    path: "/transports",
    isLoggedIn: req.session.isLoggedIn,
    transport,
    days,
    postedAgoInWords
  });
};

exports.getCreateTransport = (req, res, next) => {
  const userId = req.user;
  const dates = getFutureDates();

  res.render("transport/create-transport", {
    pageTitle: "Додај Превоз",
    path: "/create-transport",
    isLoggedIn: req.session.isLoggedIn,
    userId,
    dates,
    sdays,
    countries
  });
};

exports.postCreateTransport = async (req, res, next) => {
  const type = req.body.type;
  const from = req.body.from;
  const countryFrom = req.body.countryFrom;
  const to = req.body.to;
  const countryTo = req.body.countryTo;
  let date = req.body.date;
  let time = req.body.time;
  const price = req.body.price;
  const passengers = req.body.passengers;
  const vechile = req.body.vechile;
  const phone = req.body.phone;
  const comment = req.body.comment;
  const userId = req.user;

  time = time.match(/\d+/g);
  let hours = +time[0];
  let minutes = +time[1];

  time = new Date(2019, 01, 11, hours, minutes);
  date = stringToDate(date);
  const transport = new Transport({
    type,
    from,
    countryFrom,
    to,
    countryTo,
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
  res.redirect("/transports");
};

exports.searchTransport = async (req, res, next) => {
  const from = req.body.from;
  const to = req.body.to;
  let date = req.body.date;

  let transports = "";
  const dates = getFutureDates();
  date = stringToDate(date);
  today = new Date(date);

  const tommorow = getTomorrow(today);

  // DEPENDING ON SEARCH PARAMETERS FINDING EITHER
  // JUST THE "FROM" AND THE PROVIDED DATE
  // JUST THE "TO" AND THE PROVIDED DATE
  // BOTH AND THE DATE
  // JUST THE DATE

  if (from.length > 0 && to.length <= 0) {
    transports = await Transport.find({
      from,
      date: { $gte: today, $lte: tommorow }
    });
  } else if (from.length <= 0 && to.length > 0) {
    transports = await Transport.find({
      to,
      date: { $gte: today, $lte: tommorow }
    });
  } else if (from.length > 0 || to.length > 0) {
    transports = await Transport.find({
      from,
      to,
      date: { $gte: today, $lte: tommorow }
    });
  } else {
    transports = await Transport.find({
      date: { $gte: today, $lte: tommorow }
    });
  }

  res.render("transport/transports", {
    pageTitle: "Превози",
    path: "/search-transports",
    isLoggedIn: req.session.isLoggedIn,
    transports,
    today,
    tommorow,
    days,
    sdays,
    dates
  });
};
