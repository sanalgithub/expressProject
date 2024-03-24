// @ts-nocheck
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//desc Registering a user
//@route POST /api/user/register
//@access Public
const regUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        userName,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            user: {
                _id: user.id,
                email: user.email
            },
            message: "User created"
        });
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }
});


//desc login a user
//@route POST /api/user/login
//@access Public

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401);
        throw new Error("All fields are mandatory");
    }
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id
            }
        }, 'expressProject', { expiresIn: process.env.JWT_TOKE_EXPIRY_TIME});
        res.status(200).json({ accessToken });
    }         res.json({ message: "login user" });
    }
);

//desc current user detail
//@route GET /api/user/currentUser

const currentUser = asyncHandler(async(req,res)=>{
    console.log(req.user)
    res.json(req.user)
})

module.exports = { regUser, login, currentUser };
