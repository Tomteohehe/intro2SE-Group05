const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ['Lifestyle', 'Fitness', 'Knowledge', 'Culture', 'Religion'],
        default: 'Fitness'
    },

    image: {
        type: String
    },

    content: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    } 
})

module.exports = mongoose.model('posts', PostSchema)