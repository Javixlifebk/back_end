const util = require('util')
const multer = require('multer')
// global.__basedir = __dirname;
// const multer = require('multer')
const path = require('path')
const maxSize = 2 * 1024 * 1024
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
// })


let uploadFile = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).fields(
  [
    { 
      name: 'image', 
      maxCount: 1 
    }, 
    { 
      name: 'client_logo', 
      maxCount: 1 
    }
  ]
)

let uploadFileMiddleware = util.promisify(uploadFile)
module.exports =  uploadFileMiddleware



// const upload =.any([{name:'image',name:"icon"}])