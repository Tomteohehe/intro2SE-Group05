const express = require('express')
const router = express.Router()

const Post = require('../models/post')
const verifyToken = require('../middleware/auth')

// @route GET api/posts
// @desc Get posts
// @access Private

router.get('/', verifyToken, async(req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username'])
        res.json({success: true, message: posts})
    }   
    catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
})



// @route POST api/posts
// desc create post
// @access private

router.post('/', verifyToken, async(req, res) => {
    const {title, description, url} = req.body

    // simple validation

    if(!title) {
        return res.status(400).json({success: false, message: 'Title is required'})
    }

    try {
        const newPost = new Post({title, description, url:
            (url.startsWith('https://')) ? url : `https://${url}`,
            user: req.userId
        })

        await newPost.save()
        res.json({success: true, message: 'New post has been posted!', post: newPost})
    }

    catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
})

// @route PUT api/posts
// @desc Update post
// @access Private

router.put('/:id', verifyToken, async(req, res) => {
    const {title, description, url} = req.body
    if(!title) {
        return res.status(400).json({success: false, message: 'Title is required'})
    }

    try {
        let updatedPost = {
            title, 
            description: description || '', 
            url: (url.startsWith('https://')) ? url : `https://${url}` || ''
        }

        const updateCondition = {_id: req.params.id, user: req.userId}
        updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {new: true})
        
        // User not authorised to update post or post not found
        if(!updatedPost) {
            return res.status(401).json({success: false, message: 'Post not found or user not authorized'})
        }

        return res.json({success: true, message: 'Post updated succesfully', post: updatedPost})
    }

    catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
})

// @route DELETE api/posts
// @desc Delete post
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const deleteCondition = {_id: req.params.id, user: req.userId}
        const deletedPost = await Post.findOneAndDelete(deleteCondition)

        // user not authorised or post not found
        if(!deletedPost) {
            return res.status(401).json({success: false, message: 'Post not found or user not authorized'})
        }

        return res.json({success: true, message: 'Post deleted succesfully', post: deletedPost})
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
})

module.exports = router