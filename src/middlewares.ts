import { RequestHandler } from "express"
import multer from "multer"

export const localMiddleware:RequestHandler = async(req,res,next)=>{
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.username = req.session.username
    res.locals.nickname = req.session.nickname
    res.locals.uniqueId = req.session.uniqueId
    res.locals.email = req.session.email
    res.locals.certification = Boolean(req.session.certification)
    res.locals.avatarUrl = req.session.avatarUrl
    res.locals.subscribe = req.session.subscribe
    res.locals.subscriber = req.session.subscriber
    console.log(res.locals.avatarUrl)
    next()
}

export const publicOnlyMiddleware:RequestHandler = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error","Not autorize")
    return res.redirect("/");
  }
};
export const protectOnlyMiddleware:RequestHandler = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  }else if(req.session.email){
    return next()
  } else {
    req.flash("error","로그인이 필요해요")
    console.log(res.locals.messages)
    return res.redirect("/");
  }
};


//multer for upload, edit
export const uploadAvatar = multer({
  dest:"uploads/avatars/",
  limits:{
    fileSize:3000000,
  }
})
export const storageAvatar = multer({
  dest:"uploads/storage/",
  limits:{
    fileSize:3000000,
  }
})

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/videos/")
  },
  filename:(req,file,cb)=>{
    let mimeType ;
    switch (file.mimetype) {
      case "video/mp4":
        mimeType = "mp4";
        break;
        case "video/avi":
          mimeType = "png";
          break;
          case "video/mov":
            mimeType = "mov";
            break;
            case "video/wmv":
        mimeType = "wmv";
      break;
      default:
        mimeType = "mp4";
        break;
      }
      cb(null,req.session.uniqueId+"_"+Date.now()+"."+mimeType)
    },
  })
const storage2 = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/storage/")
  },
  filename:(req,file,cb)=>{
    let mimeType ;
    switch (file.mimetype) {
      case "video/mp4":
        mimeType = "mp4";
        break;
        case "video/avi":
          mimeType = "png";
          break;
          case "video/mov":
            mimeType = "mov";
            break;
            case "video/wmv":
        mimeType = "wmv";
      break;
      default:
        mimeType = "mp4";
        break;
      }
      cb(null,Math.random()+"."+mimeType)
    },
  })
  export const uploadVideo = multer({
    storage,
    limits:{
      fileSize:10000000,
    }
  })
  
  export const preVideo = multer({
    storage:storage2
  })