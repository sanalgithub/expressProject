const express= require('express')
const router= express.Router()
const {getAllContact,createContact,updateContact}= require('../controllers/contactController')

router.route("/").get(getAllContact).post(createContact)
router.route('/:id').put(updateContact)

module.exports = router