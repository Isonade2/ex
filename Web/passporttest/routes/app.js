const express = require("express");
const app = express();
const db = require("../model/db");

const expresssession = require("express-session");
const passport = require("../model/passport");
const flash = require("connect-flash");

const loginRouter = require("./index");

const path = require("path");
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(
  expresssession({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(flash());

app.use("/", loginRouter);

app.get("/", (req, res) => {
  res.render("login");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
