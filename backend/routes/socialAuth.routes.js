import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import "../config/passport.js"   
const socialAuthRouter = express.Router()

// Google Login
socialAuthRouter.get("/google",passport.authenticate("google", { scope: ["profile", "email"]})
)

// Callback URL
socialAuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.json({
      message: "Google login success",
      ...req.user,
    });
  }
);
export default socialAuthRouter