const path = require("path");
const MONGODB_URI = "mongodb://localhost/prevoz";
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const flash = require("connect-flash");

//ROUTES
const authRoutes = require("./routes/auth");
const transportRoutes = require("./routes/transport");

//MODELS
const User = require("./models/user");

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

const csrfProtection = csrf();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(flash());
app.use(async (req, res, next) => {
  if (!req.session.user) {
    next();
  }

  let user = await User.findById(req.session.user._id);
  req.user = user;
  next();
});

app.use(authRoutes);
app.use(transportRoutes);

app.use("/", (req, res, next) => {
  res.render("homepage", {
    pageTitle: "Homepage",
    path: "/home",
    isLoggedIn: req.session.isLoggedIn
  });
});
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(() => {
  console.log("Connected to mongoDb");
  app.listen(3000);
});
