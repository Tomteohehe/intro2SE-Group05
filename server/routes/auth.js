const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const verifyToken = require('../middleware/auth')

// @route GET api/auth
// @desc check if user logged in
// @access Public

router.get('/', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user) {
            return res.status(400).json({success: false, message: 'User not found'})
        }
        res.json({success: true, user})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})


// @route POST api/auth/register
// desc Register user
// @access Public

router.post('/register', async(req, res) => {
    const { username, email, password } = req.body

    if(!username || !email || !password){
        return res.status(400).json({success: false, message: 'Missing information'})
    }
    try {
        const existUsername = await User.findOne({username})
        if(existUsername){
            return res.status(400).json({success: false, message: 'Username is already in use'})
        }

        const existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({success: false, message: 'Email is already in use'})
        }
        
        const newUser = new User({ username, email, password })
        await newUser.save()
        
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN)
        res.json({success: true, message: "Create new user successfully", accessToken})
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }   
})

// @route POST api/auth/login
// desc Login user
// @access Public

router.post('/login', async(req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({success: false, message: 'Missing email and/or password'})
    }
    try {
        const existEmail = await User.findOne({email})
        if(!existEmail) {
            return res.status(400).json({success: false, message: 'Error in email or password'})
        }
        if(existEmail.password != password){
            return res.status(400).json({success: false, message: 'Wrong password'})
        }
        const accessToken = jwt.sign({userId: existEmail._id}, process.env.ACCESS_TOKEN)
        res.json({success: true, message: "User logged in successfully", accessToken, username: existEmail.username})
    }
   
    catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }   
})

// @route PUT api/auth/update
// @desc Update user
// @access Private

router.put('/:id', verifyToken, async(req, res) => {
    let updatedUser = {
        username, 
        email, 
        password, 
        contact, 
        description,
        id
    } = req.body

    const implementUser = {
        username : updatedUser.username, 
        email : updatedUser.email, 
        password : updatedUser.password, 
        contact : updatedUser.contact, 
        description : updatedUser.description
    }

    try {
        const existUsername = await User.findOne({'username': username})
        if(existUsername) {
            if(existUsername._id != id) return res.status(400).json({success: false, message: 'Username is already in use'})
        }
        const existEmail = await User.findOne({'email': email})
        if(existEmail) {
            if(existEmail._id != id) return res.status(400).json({success: false, message: 'Email is already in use'})
        }
        
        const updateCondition = {_id: req.params.id}
        updatedUser = await User.findOneAndUpdate(updateCondition, implementUser, {new: true})
        
        // Cannot update User
        if(!updatedUser) {
            return res.status(401).json({success: false, message: 'User not authorized'})
        }
        return res.json({success: true, message: 'User profile updated succesfully', user: updatedUser})
    }

    catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

router.get("/alluser", async (req, res) => {
  const allUser = await User.find();
  res.json(allUser);
});

module.exports = router;
