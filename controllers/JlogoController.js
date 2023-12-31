// const db = require('../../models/landingPageModels/bannerModel')
const db = require('../models/JlogoModel')
const Imgupload =  require('../middlewares/navbarLogo');
// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Logo = db.Jlogo


// 1. create product

const addJLogos = async (req, res) => {
    try {
        await Imgupload(req,res);
    let dataObj = {}

    if(req.files['javixLogo']){ 
      const profileImage =req.files['javixLogo'][0].filename; 
      dataObj.javixLogo = profileImage; 
    }
 
  
 console.log(dataObj);
    // const url = req.protocol + '://' + req.get('host')
    let info = {
        javixLogo:dataObj.javixLogo,
        // client_logo:dataObj.client_logo,
        ngoId: req.body.ngoId,
        
      
    }

    const banner = await Logo.create(info)

    res.status(200).send(banner)
    console.log(banner)
}catch(err){

}

}



// 2. get all banner

const getAlllogo = async (req, res,count) => {

    let banner = await Logo.find({})
    banner.forEach(function(element, i, banner){ 
        banner[i]['javixLogo'] =  req.protocol + '://' + req.get('host')+'/'+ element['javixLogo'];
        
        
    });
    res.status(200).send(banner)

}


// 3. get single banner

const getOneBanner = async (req, res) => {

    let id = req.params.id
    let banner = await Banner.findOne({ where: { id: id }})
  
    res.status(200).send(banner)

}


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


module.exports = {
    addJLogos,
    getAlllogo,
    updateBanner,
    deleteBanner,
    // upload,
    getOneBanner,
    // uploadIcon
    
}