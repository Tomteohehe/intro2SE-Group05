require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://hoangtranthong03:mine_senpai0904@goatalks.gok1ryd.mongodb.net/database`)
        console.log('MongoDB connect')
    }
    catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)


const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))