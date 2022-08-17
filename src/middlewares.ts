import { RequestHandler } from "express"

export const localMiddleware:RequestHandler = (req,res,next)=>{
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.username = req.session.username
    res.locals.nickname = req.session.nickname
    res.locals.uniqueId = req.session.uniqueId
    next()
}

export const publicOnlyMiddleware:RequestHandler = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};