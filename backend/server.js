const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

// User Model
const User = mongoose.model('User', userSchema)

// database connection variable
let connection = null

// Initialize Database and Server
const initializeDBAndServer = async () => {
    try {
        connection = await mongoose.connect(process.env.MONGO_URI)
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}/`)
        })
    } catch(e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

// call the initializer
initializeDBAndServer()

// Registe User API
app.post('/signup/', async (request, response) => {
    try {
        const {username, email, password} = request.body

        const existingUserByUsername = await User.findOne({username})
        if (existingUserByUsername) {
            response.status(400).json({message: "Username is already taken"})
            return
        }

        const existingUserByEmail = await User.findOne({email})
        if (existingUserByEmail) {
            response.status(400).json({message: "Email is already taken"})
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save()

        response.status(200).json({message: 'User Registered Successfully'})
    } catch(e) {
        response.status(500).json({message: "Internal Sever Error"})
    }
})

// Login User API
app.post('/signin', async (request, response) => {
    const {email, password} = request.body
    
    const dbUser = await User.findOne({email})
    if (!dbUser) {
        response.status(400).json({message: "User does't exist"})
    } else {
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
        if (isPasswordMatched) {
            const payload = {email}
            const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN')
            response.status(200).json({jwtToken})
        } else {
            response.status(400).json({message: "Invalid password"})
        }
    }
})

// Generating signature for deleting image from cloudinary
app.post('/generate-signature', (request, response) => {
    const {public_id, timestamp} = request.body
    if (!public_id || !timestamp) {
        return response.status(400).json({error: "Missing required fields"})
    }

    const signString = `public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`
    const signature = crypto.createHash("sha1").update(signString).digest("hex")
    
    response.json({signature, api_key: CLOUDINARY_API_KEY})
})