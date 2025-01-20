const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

dotenv.config()

const app = express()
app.use(express.json())

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
app.post('/register/', async (request, response) => {
    try {
        const {username, email, password} = request.body
        const dbUser = await User.findOne({email: email})
        
        if (dbUser) {
            response.status(400)
            response.send("User Already Exists")
        } 

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save()

        response.status(200)
        response.send('User Registered Successfully')
    } catch(e) {
        response.status(500)
        response.send("Something went wrong. Please try again later.")
    }
})