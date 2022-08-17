
export const localMiddleware = (req:any,res:any,next:Function)=>{
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.username = req.session.username
    res.locals.nickname = req.session.nickname
    res.locals.uniqueId = req.session.uniqueId
    next()
}