import { RequestHandler } from "express"
import multer, { Multer } from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"


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


// file upload 

// 
export const s3= new aws.S3({
  credentials:{
    accessKeyId:`${process.env.S3_KEY}`,
    secretAccessKey:`${process.env.S3_SECRET}`
  }
})

const s3ImageUploader = multerS3({
  s3:s3,
  bucket:`wetube-jinytree/image`,
  acl: 'public-read',
  key: (req,file,cb)=>createFileName(req, file, cb) 
})

const s3VideoUploader = multerS3({
  s3:s3,
  bucket:`wetube-jinytree/video`,
  acl: 'public-read',
  key: (req,file,cb)=>createFileName(req, file, cb) 
})

const createFileName=(req: any,file: any,cb: any)=>{
  let mimeType ;
  if(file.mimetype.includes("video")){
    switch (file.mimetype) {
      case "video/mp4":
        mimeType = "mp4";
        break;
        case "video/avi":
          mimeType = "avi";
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
            }else if(file.mimetype.includes("image")){
              switch (file.mimetype) {
                case "image/png":
                  mimeType = "png";
                  break;
                  case "image/jpeg":
                    mimeType = "jpeg";
                    break;
                    default:
                      mimeType = "png";
                      break;
                    }
                  }
                  cb(null, req.session.email+`${req.session.random}` + "."+mimeType);
}

export const uploadAvatar = multer({
  dest:"uploads/avatars/",
  limits:{
    fileSize:3000000,
  },
  storage:s3ImageUploader,
})
export const storageAvatar = multer({
  dest:"uploads/storage/",
  limits:{
    fileSize:3000000,
  },
  
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
    storage:s3VideoUploader,
    limits:{
      fileSize:30000000,
    }
  })
  
  export const preVideo = multer({
    storage:storage2
  })