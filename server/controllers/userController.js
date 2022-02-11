const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

// @desc    Register user
// @route   POST /api/users
// @access  Public

// const registerUser =  asyncHandler( async (req, res) => {
//     res.json({message: 'Register User'});
// });

const registerUser =  asyncHandler( async (req, res) => {
    
    const { firstName, lastName, email, password } = req.body;

    if(!firstName || !lastName || !email || !password){
        res.status(400);
        throw new Error('Please add all fields for user registration.')
    }

    // Check if user exists
    const userExists =  await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists.')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    if(user){
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lasttName: user.lastName,
            email: user.email,
            token: generateToken(user.id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data.')
    }

});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public

// const loginUser = asyncHandler( async (req, res) => {
//     res.json({message: 'Login User'});
// });

const loginUser = asyncHandler( async (req, res) => {

    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user.id),
        });
    }
    // res.json({message: 'Login User'});
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private

const getMe = asyncHandler( async (req, res) => {
    res.json({message: 'User Data'});
});

const  generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d', });
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}