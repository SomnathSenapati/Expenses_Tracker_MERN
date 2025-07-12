const express=require('express')
const FeaturesController = require('../../controllers/admin/FeaturesController')
const router=express.Router()


router.get("/list", FeaturesController.List);
// router.post('/add',FeaturesController.createexperience)
// router.get('/edit/:id',FeaturesController.edit)
// router.post('/update/:id',FeaturesController.update)
// router.get('/delete/:id',FeaturesController.delete)

module.exports = router