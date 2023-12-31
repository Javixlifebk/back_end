// import controllers  banner
const bannerController = require('../controllers/logoController')



// router
const router = require('express').Router()


// use routers
router.post('/addbanner', bannerController.addLogos)

router.post('/getLogo', bannerController.getLogo)


router.get('/:id', bannerController.getOneBanner)

router.put('/:id', bannerController.updateBanner)

router.delete('/:id', bannerController.deleteBanner)

module.exports = router