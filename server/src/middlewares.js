import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { config } from "dotenv";

config();

passport.use(
  "auth-github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, { accessToken, refreshToken, ...profile });
    }
  )
);
