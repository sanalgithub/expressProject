const mongoose = require("mongoose");
const { modelConstant } = require('./constants');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, modelConstant.NAME_IS_REQUIRED]
    },
    email: {
        type: String,
        required: [true, modelConstant.EMAIL_IS_REQUIRED],
        unique: [true, modelConstant.EMAIL_IS_ALREADY_TAKEN]
    },
    password: {
        type: String,
        required: [true, modelConstant.PLEASE_ENTER_THE_PASSWORD]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
