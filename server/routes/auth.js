const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/users')

// router.get('/', (req, res) => res.send('USER ROUTE'))

// @route POST api/auth/register
// desc Register user
// @access Public

// router.get('/', (req, res) => res.send('USER ROUTE ') )

router.post('/register', async(req, res) => {
    const {username, password, email} = req.body

    if(!username || !password){
        return res.status(400).json({success: false, message: 'no user'})
    }
    try {
        const userName = await User.findOne({username})
        if(userName){
            return res.status(400).json({success: false, message: 'Username is already in use'})
        }
        
        const newUser = new User({username, password, email})
        await newUser.save()
        
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN)
        res.json({success: true, message: "create new user successfully", accessToken})
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }   
})

// @route POST api/auth/login
// desc Login user
// @access Public

router.post('/login', async(req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        return res.status(400).json({success: false, message: 'Missing usernmae and/or password'})
    }
    try {
        const userName = await User.findOne({username})
        if(!userName) {
            return res.status(400).json({success: false, message: 'Error in username or password'})
        }
        if(userName.password != password){
            return res.status(400).json({success: false, message: 'wrong password'})
        }
        const accessToken = jwt.sign({userId: userName._id}, process.env.ACCESS_TOKEN)
        res.json({success: true, message: "user logged in successfully", accessToken})
    }
   
    catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }   
})

router.get('/alluser', async(req, res) => {
    const allUser = await User.find()
    res.json(allUser)
})

module.exports = router