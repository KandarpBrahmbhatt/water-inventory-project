import passport from 'passport'

import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import dotenv from 'dotenv'
import { googleLogin } from '../controller/socialAuthentication.controller.js';
dotenv.config()

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRETE,
            callbackURL: "http://localhost:5000/api/social/google/callback"
        },
        async(accessToken,refreshToken,profiler,done) =>{
            try {
                const data = await googleLogin(profiler)
                done(null,data)
            } catch (error) {
                console.log(error,null)
            }
        }
    )
);


export default passport