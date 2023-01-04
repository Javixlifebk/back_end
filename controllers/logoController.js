// const db = require('../../models/landingPageModels/bannerModel')
const db = require('../models/logoModel')
const Imgupload =  require('../middlewares/navbarLogo');
// image Upload
const multer = require('multer')
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

    res.status(200).send(banner)
    console.log(banner)
}catch(err){

}

}



// 2. get all banner

const getAllBanner = async (req, res,count) => {

    let banner = await Logo.find({})
    banner.forEach(function(element, i, banner){ 
        banner[i]['image'] =  req.protocol + '://' + req.get('host')+'/'+ element['image'];
        banner[i]['icon'] =  req.protocol + '://' + req.get('host')+'/'+ element['icon'];
        
    });
    res.status(200).send(banner)

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
    getAllBanner,
    updateBanner,
    deleteBanner,
    // upload,
    getOneBanner,
    // uploadIcon
    
}