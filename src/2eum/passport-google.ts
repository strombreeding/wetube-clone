import passport from "passport"
import User from "../models/User"
const GoogleStrategy = require("passport-google-oauth2").Strategy
passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user:any, done) {
	done(null,user);
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.EUM_GOOGLE_ID,
        clientSecret : process.env.EUM_GOOGLE_SECRET,
        callbackURL : "https://strombreeding.github.io/2eum/sosialTerminal.html",
        passReqToCallback:true
    },
    async (request:any,accessToken: any , refreshToken: any, profile: any, done:Function) => {
        console.log(profile)
        console.log("zz")
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

