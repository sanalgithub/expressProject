const mongoose = require('mongoose')
const { modelConstant } = require('./constants')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, modelConstant.NAME_IS_REQUIRED]
    },
    email: {
        type: String,
        required: [true, modelConstant.EMAIL_IS_REQUIRED]
    },
    phone: {
        type: String,
        required: [true, modelConstant.PHONE_IS_REQUIRED]
    },
}, {
    timestamps: true
})


module.exports = mongoose.model("Contact",contactSchema)

