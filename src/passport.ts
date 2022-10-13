import passport from "passport"
import User from "./models/User"
const GoogleStrategy = require("passport-google-oauth2").Strategy
passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user:any, done) {
	done(null,user);
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret : process.env.GOOGLE_SECRET,
        callbackURL : "https://wetube-jinytree.herokuapp.com/user/auth/google/callback",
        passReqToCallback:true
    },
    async (request:any,accessToken: any , refreshToken: any, profile: any, done:Function) => {
        console.log(profile)
        try{
            done(null,profile)
        }
        catch(err){
            console.log(err)
            return err
        }
    })
)

export default passport

