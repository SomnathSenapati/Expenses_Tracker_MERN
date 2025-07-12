const express=require('express')
const PricingController = require('../../controllers/admin/PricingController')
const StudentImageupload = require('../../helper/studentimageupload')
const router=express.Router()


// router.post('/add',StudentImageupload.single('image'),PricingController.createabout)
router.get("/list", PricingController.List);
// router.get('/edit/:id',PricingController.edit)
// router.post('/update/:id',StudentImageupload.single('image'),PricingController.update)
// router.get('/delete/:id',PricingController.delete)

module.exports = router