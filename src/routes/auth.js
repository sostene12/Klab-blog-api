import express from "express";
import Google from "passport-google-oauth2";
import passport from "passport";
import User from "../models/user";

const authRoute = express.Router();
const GoogleStrategy = Google.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({googleId:profile.id});
        if(!user){
          const newUser = new User({
            username:profile.displayName,
            email:profile.email,
            role:'user',
            googleId:profile.id
          })
          await newUser.save();
          return done(null,newUser);        }
        else{
          return done(null,user)
        }

      } catch (error) {
        console.log(error)
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null,user)
});

authRoute.get("/dashboard",(req,res) =>{
  res.send('<h1>DASHBOARD</h1>')
})

authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/dashboard",
    failureRedirect: "/login",
  })
);

authRoute.get("/login", (req, res) => {
  res.send(
    "<h1> Google Login </h1>Click here to authenticate with Google <form action='/auth/google' method='GET'><button type='submit'> GOOGLE BUTTON </button></form>"
  );
});

// middleware to authenticate user
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

authRoute.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

export default authRoute;
