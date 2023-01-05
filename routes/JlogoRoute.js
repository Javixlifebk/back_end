// import controllers  banner
const bannerController = require('../controllers/JlogoController')



// router
const router = require('express').Router()


// use routers
router.post('/addlogo', bannerController.addJLogos)

router.get('/getAlllogo', bannerController.getAlllogo)


router.get('/:id', bannerController.getOneBanner)

router.put('/:id', bannerController.updateBanner)

router.delete('/:id', bannerController.deleteBanner)

module.exports = router