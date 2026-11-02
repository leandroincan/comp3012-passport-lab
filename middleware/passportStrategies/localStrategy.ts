import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmailIdAndPassword,
  getUserById,
} from "../../controllers/userController";
import { PassportStrategy, User } from "../../interfaces";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    try {
      const user = getUserByEmailIdAndPassword(email, password);

      if (user) {
        return done(null, user);
      }

      return done(null, false, {
        message: "Password is incorrect",
      });
    } catch (error) {
      if (error instanceof Error) {
        return done(null, false, {
          message: error.message,
        });
      }

      return done(null, false);
    }
  }
);

passport.serializeUser((user, done) => {
  const currentUser = user as User;
  done(null, currentUser.id);
});

passport.deserializeUser((id: number, done) => {
  try {
    const user = getUserById(id);

    if (user) {
      done(null, user);
    } else {
      done(new Error("User not found"), null);
    }
  } catch (error) {
    done(error, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: "local",
  strategy: localStrategy,
};

export default passportLocalStrategy;