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

app.use(cors({origin: "*", methods: "GET,POST,PUT,DELETE,OPTIONS"}))
app.options("*", cors())

const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
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
    accountCreated: {
        type: Date,
        default: Date.now,
    },
})

// Profile Schema
const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    profileUrl: {
        type: String, 
        default: null
    },
    firstName: {
        type: String, 
        required: true, 
        trim: true
    },
    lastName: {
        type: String, 
        required: true, 
        trim: true
    },
    bio: {
        type: String, 
        required: true, 
        trim: true
    },
    profession: {
        type: String, 
        required: true, 
        trim: true
    },
    socialLink: {
        type: String, 
        default: null, 
        trim: true
    },
    location: {
        type: String, 
        required: true, 
        trim: true
    },
})

// Post Schema
const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    caption: {
        type: String,
        trim: true,
        default: null,
    },
    mediaUrl: {
        type: String,
        default: null,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// User Model
const User = mongoose.model('User', userSchema)

// Profile Model
const Profile = mongoose.model('Profile', ProfileSchema)

// Post Model
const Post = mongoose.model('Post', PostSchema)

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

// Middleware function to authenticate User
const authenticateToken = (request, response, next) => {
    let jwtToken
    const authHeader = request.headers["authorization"]
    if (authHeader) {
        jwtToken = authHeader.split(" ")[1]
    }
    if (!jwtToken) {
        response.status(401)
        response.json({message: "Invalid JWT Token"})
        return
    } else {
        jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
            if (error) {
                response.status(401)
                response.json({message: "Invalid JWT Token"})
            }
            else {
                request.email = payload.email
                request.userId = payload.userId
                next()
            }
        })
    }
}


// Registe User API
app.post('/sign-up/', async (request, response) => {
        const {username, email, password} = request.body

        const existingUserByUsername = await User.findOne({username})
        if (existingUserByUsername) {
            response.status(400)
            response.json({message: "Username is already taken"})
            return
        }

        const existingUserByEmail = await User.findOne({email})
        if (existingUserByEmail) {
            response.status(400)
            response.json({message: "Email is already taken"})
            return
        }

        if (password.length < 8) {
            response.status(400)
            response.json({message: "Password must contain at least 8 characters"})
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save()

        response.status(200)
        response.json({message: "User Registered Successfully"})
})


// Login User API
app.post('/sign-in', async (request, response) => {
    const {email, password} = request.body
        
    const dbUser = await User.findOne({email})

    if (!dbUser) {
        response.status(400)
        response.json({message: "User does't exist"})
        return
    } else {
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
        if (isPasswordMatched) {
            const payload = {userId: dbUser._id, email}
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET)
            response.status(200)
            response.send({jwtToken})
        } else {
            response.status(401)
            response.json({message: "Invalid password"})
        }
    }
})


// Checks if the profile exists for the currently authenticated user
app.get('/profile/status/', authenticateToken, async (request, response) => {
    const {userId} = request
    const profileExists = await Profile.findOne({userId})
    response.json({profile_exist: !!profileExists})    
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


// API for fetching user data used in CreateProfile Component
app.get('/user/details/', authenticateToken, async (request, response) => {
    const {userId} = request

    const dbUser = await User.findOne({_id: userId}, {_id: 0, username: 1, email: 1})

    if (!dbUser) {
        response.status(404)
        response.json({message: "User not found"})
        return
    }

    response.send(dbUser)
})


// Creating User Profile
app.post('/profile/', authenticateToken, async (request, response) => {
    const {userId, email} = request
    const {profileUrl, firstName, lastName, bio, profession, socialLink, location} = request.body

    if (!firstName || !lastName || !bio || !profession || !location) {
        response.status(400)
        response.json({message: "All required fiels must be filled"})
        return
    }

    const newProfile = new Profile({
        userId,
        profileUrl,
        firstName,
        lastName,
        bio,
        profession,
        socialLink,
        location,
    })

    await newProfile.save()
    
    response.status(201)
    response.json({message: "Profile successfully saved"})
})

// Creating new post
app.post('/posts/new/', authenticateToken, async (request, response) => {
    const {userId, email} = request
    console.log(email)
    const {caption, mediaUrl} = request.body

    const newPost = new Post({
        userId,
        caption,
        mediaUrl,
    })

    await newPost.save()
    response.status(200)
    response.json({message: "Post created successfully"})
})

// Fetch all posts
app.get('/posts/', async (request, response) => {
    const postsList = await Post.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
            }
        },
        {
            $unwind: '$userDetails',
        },
        {
            $lookup: {
                from: 'profiles',
                localField: 'userId',
                foreignField: 'userId',
                as: 'profileDetails',
            }
        },
        {
            $unwind: '$profileDetails',
        },
        {
            $project: {
                _id: 1,
                caption: 1,
                mediaUrl: 1,
                likesCount: 1,
                commentsCount: 1,
                createdAt: 1,
                'username': '$userDetails.username',
                'profileImageUrl': '$profileDetails.profileUrl',
            }
        }
    ])
    
    response.status(200)
    response.send(postsList)
})


// Search User API
app.get('/search', async (request, response) => {
    const {query} = request.query

    const userList = await User.aggregate([
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'userDetails'
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $match: {
                username: {$regex: query}
            }
        },
        {
            $project: {
                username: 1,
                'profileUrl': '$userDetails.profileUrl',
                'profession': '$userDetails.profession',
                'location': '$userDetails.location'
            }
        }
    ])
    
    response.status(200)
    response.send(userList)
})



/**
@route GET /profile/:userId/
@desc Fetch user details and their posts 
**/

app.get("/profile/:userId", async (request, response) => {
	const {userId} = request.params

	const userProfileData = await User.aggregate([
		{$match: {_id: new mongoose.Types.ObjectId(userId)}},
		{
			$lookup: {
				from: 'profiles',
				localField: '_id',
				foreignField: 'userId',
				as: 'profileData',
			}
		},
		{
			$unwind: '$profileData',
		},
		{
			$lookup: {
				from: 'posts',
				localField: '_id',
				foreignField: 'userId',
				as: 'posts',
			}
		},
		{
			$project: {
				username: 1,
				accountCreated: 1,
				'profileUrl': '$profileData.profileUrl',
				'firstName': '$profileData.firstName',
				'lastName': '$profileData.lastName',
				'bio': '$profileData.bio',
				'profession': '$profileData.profession',
				'socialUrl': '$profileData.socialLink',
				'location': '$profileData.location',
				posts: {$ifNull: ['$posts', []]},
			}
		}
	])

	if (userProfileData.length === 0) {
		response.status(404)
		response.json({message: "User not found"})
		return
	}

	response.status(200)
	response.json(userProfileData[0])
})






















