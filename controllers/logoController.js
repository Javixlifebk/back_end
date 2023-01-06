// const db = require('../../models/landingPageModels/bannerModel')
const db = require('../models/logoModel')
const Imgupload =  require('../middlewares/navbarLogo');
// image Upload
const apiResponse = require("../helpers/apiResponse");
const multer = require('multer')
const { body, query, validationResult } = require("express-validator");
const path = require('path')


// create main Model
const Logo = db.Logo
// const Review = db.reviews

// main work

// 1. create product

const addLogos = async (req, res) => {
    try {
        await Imgupload(req,res);
    let dataObj = {}

    if(req.files['image']){ 
      const profileImage =req.files['image'][0].filename; 
      dataObj.image = profileImage; 
    }
 
    if(req.files['client_logo']){
      const bannerImage = req.files['client_logo'][0].filename;  
      dataObj.client_logo = bannerImage; 
    }
    // 'http://javixlife.org:3010/profile/'+req.file.filename
//     let imgArr = [];
//     req.files.forEach(element => {
//      imgArr[element.fieldname] = element.path;
//  });
 console.log(dataObj);
    // const url = req.protocol + '://' + req.get('host')
    let info = {
        image:dataObj.image,
        client_logo:dataObj.client_logo,
        ngoId: req.body.ngoId,
        
      
    }

    const banner = await Logo.create(info)
 if(banner){
    res.status(200).send(banner)
    console.log(banner)
  }
   
    
}catch(err){
res.status(400)
}

}



// 2. get all banner

const getLogo = async (req, res,count) => {

	try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
    } else {

await Logo.aggregate([
     {$match:{'ngoId':req.body.ngoId}} ,
{
  '$project':{
    client_logo: {$concat: ["http://",req.headers.host,"/profile/","$client_logo"]},
  }
}
    ]).then(banner => {
					
    let user=banner[0];
    if (user) {
    return apiResponse.successResponseWithData(res,"Found", banner);
  }
  else return apiResponse.ErrorResponse(res,"Not Found");

    // res.status(200).send(banner)
  
})
    }
}catch (err) {
		
  return apiResponse.ErrorResponse(res, "EXp:" + err);
}
}



// 3. get single banner

const getOneBanner = async (req, res) => {

    let id = req.params.id
    let banner = await Banner.findOne({ where: { id: id }})
    // banner.forEach(function(element, i, banner){ 
        // banner[i]['image'] =  req.protocol + '://' + req.get('host')+'/'+ element['image'];
        // banner[i]['icon'] =  req.protocol + '://' + req.get('host')+'/'+ element['icon'];

        
    // });
    res.status(200).send(banner)

}

// 4. update Banner

const updateBanner = async (req, res) => {
   
        let id = req.params.id;
       
        
        try {
            await Imgupload(req,res);
            
        let dataObj = {}
    
        if(req.files['image']){ 
          const profileImage =req.files['image'][0].path; 
          dataObj.image = profileImage; 
        }
     
        if(req.files['icon']){
          const bannerImage = req.files['icon'][0].path;  
          dataObj.icon = bannerImage; 
        }
        // const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})
      
        Banner.findByIdAndUpdate(req.params.id, { $set:{
            image:dataObj.image,
            icon:dataObj.icon,
            title: req.body.title,
            name: req.body.name,
            designation: req.body.designation,
            description: req.body.description
        } })
      
          .then((note) => {
            if (!note) {
              return res.status(404).send({
                message: "data not found with id " + req.params.id,
              });
            }
            res.send(note);
          })
          .catch((err) => {
          
            if (err.kind === "ObjectId") {
              return res.status(404).send({
                message: "data not found with id " + req.params.id +req.file,
              });
            }
            return res.status(500).send({
              message: "Error updating note with id " + req.params.id +req.file,
            });
          });
       
      }catch(err){}

 

}

// 5. delete banner by id

const deleteBanner = async (req, res) => {

    let id = req.params.id
    
    await Banner.destroy({ where: { id: id }} )

    res.status(200).send('Banner is deleted !')

}





// 8. Upload Image Controller

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './Images/banner/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: '1000000' },
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/
//         const mimeType = fileTypes.test(file.mimetype)  
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if(mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Give proper files formate to upload')
//     }
// }).any([{name:'image',name:"icon"}])



module.exports = {
    addLogos,
    getLogo,
    updateBanner,
    deleteBanner,
    // upload,
    getOneBanner,
    // uploadIcon
    
}