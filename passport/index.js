require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const passport = require("passport");
const LocalStratergy = require("passport-local").Strategy;
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

//MIDDLEWARE_____________________
app.use(express.static("views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

//VAR____________________________
const users = [];

//AUTHENTICATION_________________
function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = users.find((i) => i.email === email);

    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (
        password &&
        user.password &&
        (await bcrypt.compare(password, user.password))
      ) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Wrong Password" });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStratergy({ usernameField: "email" }, authenticateUser)
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    return done(null, () => {
      return users.find((i) => i.id === id);
    });
  });
}

initialize(passport);

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

//GET________________________
app.get("/", checkAuth, (req, res) => {
  res.render("home", { user: req.user.name });
});
app.get("/login", checkNotAuth, (req, res) => {
  res.render("login");
});
app.get("/register", checkNotAuth, (req, res) => {
  res.render("register");
});

//POST________________________
app.post(
  "/login",
  checkNotAuth,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/register", checkNotAuth, async (req, res) => {
  try {
    const hashedPassoword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassoword,
    });
    console.log(users);
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
  }
});

//DELETE________________________
app.delete("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/login");
});

app.listen(3000);
