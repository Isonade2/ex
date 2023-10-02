const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      console.log("passport의 local-login : ", email, password);

      if (email != "test" || password != "12345") {
        console.log("비밀번호 불일치!");
        return done(
          null,
          false,
          req.flash("loginMessage", "비밀번호가 일치하지 않습니다.")
        );
      }

      console.log("비밀번호 일치!");
      return done(null, {
        email: email,
        password: password,
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser() 호출됨.");
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("deserializeUser() 호출됨.");
  console.log(user);
  done(null, user);
});

module.exports = passport;
