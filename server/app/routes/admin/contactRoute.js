const express = require("express");
const ContactController = require("../../controllers/admin/ContactController");
const router = express.Router();

router.get("/list", ContactController.List);
router.get("/add", (req, res) => {
  try {
    res.render("contact/add", {
      title: "contact Add",
    });
  } catch (error) {
    res.redirect("/contact/add");
  }
});
router.post('/add',ContactController.add)
// router.get('/edit/:id',ContactController.edit)
// router.post('/update/:id',ContactController.update)
// router.get('/delete/:id',ContactController.delete)

module.exports = router;
