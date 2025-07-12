const express=require('express')
const ServicesController = require('../../controllers/admin/ServicesController')
const router=express.Router()


router.get("/list", ServicesController.List);
// router.post("/add", ServicesController.createeducation);
// router.get("/edit/:id", ServicesController.edit);
// router.post("/update/:id", ServicesController.update);
// router.get("/delete/:id", ServicesController.delete);

module.exports = router