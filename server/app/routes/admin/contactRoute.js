const express=require('express')
const ContactController = require('../../controllers/admin/ContactController')
const router=express.Router()


router.get("/list", ContactController.List);
// router.post('/add',ContactController.createcontact)
// router.get('/edit/:id',ContactController.edit)
// router.post('/update/:id',ContactController.update)
// router.get('/delete/:id',ContactController.delete)

module.exports = router