const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStraregy = require("passport-local").Strategy;

/**
 * featthers
 */

const User = require("../models/user");

passport.use(
  new LocalStraregy(
    {
      usernameField: "phone",
      passwordField: "password",
    },
    async (phone, password, done) => {
      try {
        const user = await User.findOneAndUpdate({ phone }, { isLogin: true });
        if (!user) return done(null, false);
        const isValidPassword = await user.verifyPassword(password);
        if (!isValidPassword) return done(null, false);
        return done(null, user);
      } catch (error) {
        console.log("Phone: ", phone, "Password: ", password);
        return done(error, false);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub);
        if (!user) return done(null, false);
        if (!user.isLogin) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
