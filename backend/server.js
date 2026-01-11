const express = require('express')
const cors = require('cors')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const dbPath = path.join(__dirname, "database", "HelloMee.db")

let db = null

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                email TEXT UNIQUE,
                password TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );  
        `)

        await db.exec(`
            CREATE TABLE IF NOT EXISTS profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER UNIQUE NOT NULL,
                full_name VARCHAR(100),
                bio VARCHAR(150),
                profession VARCHAR(100),
                social_link VARCHAR(255),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `)

        await db.exec(`
            CREATE TABLE IF NOT EXISTS posts (
                post_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                text_content TEXT,
                image_url TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `)

        await db.exec(`
            CREATE TABLE IF NOT EXISTS ideas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                content VARCHAR(200) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `)

        await db.exec(`
            CREATE TABLE IF NOT EXISTS bookmarks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                post_id INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, post_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
                );
                `)
                
        await db.exec(`
            CREATE TABLE IF NOT EXISTS likes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                post_id INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, post_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
            );
        `)

        await db.exec(`
            CREATE TABLE IF NOT EXISTS followers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                follower_user_id INTEGER NOT NULL,
                following_user_id INTEGER NOT NULL,
                UNIQUE(follower_user_id, following_user_id),
                FOREIGN KEY (follower_user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (following_user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `)

        app.listen(5000, () => {
            console.log("Server running at http://localhost:5000/")
        })
    } catch (e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

initializeDBAndServer()

const validateEmailFormat = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const uploadToCloudinary = buffer => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result.secure_url)
            }
        })
        streamifier.createReadStream(buffer).pipe(uploadStream)
    })
}

const createPost = async ({userId, textContent = null, imageUrl = null}) => {
    const createPostQuery = `
        INSERT INTO posts (user_id, text_content, image_url)
        VALUES (?, ?, ?);
    `
    const result = await db.run(createPostQuery, [userId, textContent, imageUrl])
}

// sign-up api
app.post("/sign-up", async (request, response) => {
    try {
        const {username, email, password} = request.body

        // trimming extra white space 
        const trimmedUsername = username.trim()
        const trimmedEmail = email.trim()
        const trimmedPassword = password.trim()

        // checking for empty field
        if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
            response.status(400)
            response.send({error: "All fields are required"})
            return
        }

        // checking for valid password length
        if (trimmedPassword.length < 8) {
            response.status(400)
            response.send({error: "Password must be at least 8 characters long"})
            return 
        }

        // checking for correct email format 
        if (!validateEmailFormat(trimmedEmail)) {
            response.status(400)
            response.send({error: "Invalid email format"})
            return 
        }

        // fetching user by email
        const getUserByEmail = `
            SELECT
                *
            FROM
                users
            WHERE
                email = '${trimmedEmail}';
        `

        // check if email already used or not
        const isEmailALreadyUsed = await db.get(getUserByEmail)

        if (isEmailALreadyUsed) {
            response.status(409)
            response.send({error: "Email already registered"})
            return 
        }

        // fetching user by username
        const getUserByUsername = `
            SELECT
                *
            FROM
                users
            WHERE
                username = '${trimmedUsername}';
        `

        // check if username is already taken or not
        const isUsernameAlreadyTaken = await db.get(getUserByUsername)

        if (isUsernameAlreadyTaken) {
            response.status(409)
            response.send({error: "Username already taken"})
            return 
        }

        // converting password to hashed password
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10)

        // create user query
        const createUserQuery = `
            INSERT INTO users 
                (username, email, password)
            VALUES  (
                '${trimmedUsername}',
                '${trimmedEmail}',
                '${hashedPassword}'
            );
        `

        // creating new user in users table
        await db.run(createUserQuery)

        response.status(200)
        response.send({message: "Boom! Your account is ready. Now, sign in and let's go!"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// sign-in api
app.post("/sign-in", async (request, response) => {
    try {
        const {email, password} = request.body

        // trimming extra white space 
        const trimmedEmail = email.trim()
        const trimmedPassword = password.trim()

        // checking for empty field
        if (!trimmedEmail || !trimmedPassword) {
            response.status(400)
            response.send({error: "All fields are required"})
            return
        }

        // checking for correct email format 
        if (!validateEmailFormat(trimmedEmail)) {
            response.status(400)
            response.send({error: "Invalid email format"})
            return
        }

        // get user query
        const getUserQuery = `
            SELECT
                *
            FROM
                users
            WHERE
                email = '${trimmedEmail}';
        `

        // fetching user data from database
        const dbUser = await db.get(getUserQuery)


        if (!dbUser) {
            response.status(400)
            response.send({error: "Invalid email or password"})
            return
        } else {
            // comparing user entered password with password stored in database 
            const isPasswordMatched = await bcrypt.compare(trimmedPassword, dbUser.password)
            if (isPasswordMatched) { // if user enterd password matched with password stored in database 
                // payload for jwt token
                const payload = {
                    userId: dbUser.id
                }
                // creating jwt token 
                const jwt_token = jwt.sign(payload, "MY_SECRET_TOKEN")
                response.send({jwt_token})
            } else { // if password didn't match
                response.status(400)
                response.send({error: "Invalid email or password"})
            }
        }
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Authenticate Request
const authenticateToken = (request, response, next) => {
    let jwtToken
    const authHeader = request.headers["authorization"]
    if (authHeader) {
        jwtToken = authHeader.split(" ")[1]
    }
    if (!jwtToken) {
        response.status(401)
        response.send({error: "Invalid Request"})
    } else {
        jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
            if (error) {
                response.status(401)
                response.send({error: "Invalid Request"})
            } else {
                const {userId} = payload
                request.userId = userId
                next()
            }
        })
    }
}

app.get("/me", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        response.send({userId})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Get all posts
app.get("/posts", authenticateToken, async (request, response) => {
    try {
        const {userId} = request

        const getUserQuery = `
            SELECT
                id
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.get(getUserQuery, [userId])

        if (!user) {
            response.status(404)
            response.send({error: "User not found"})
            return
        }

        const getPostsQuery = `
            SELECT
                users.username,
                posts.user_id,
                posts.post_id,
                posts.text_content,
                posts.image_url,
                posts.created_at,
                COALESCE(lc.likes_count, 0) AS likes_count,
                CASE
                    WHEN likes.user_id IS NOT NULL THEN 1
                    ELSE 0
                END
                AS is_liked,
                COALESCE(bc.bookmark_count, 0) AS bookmark_count,
                CASE
                    WHEN bookmarks.user_id IS NOT NULL THEN 1
                    ELSE 0
                END
                AS is_bookmarked
            FROM
                posts
                LEFT JOIN (
                    SELECT
                        post_id,
                        COUNT(*) AS likes_count
                    FROM
                        likes
                    GROUP BY
                        post_id
                ) lc ON posts.post_id = lc.post_id
                LEFT JOIN likes
                ON posts.post_id = likes.post_id AND likes.user_id = ?
                LEFT JOIN (
                    SELECT
                        post_id,
                        COUNT(*) AS bookmark_count
                    FROM
                        bookmarks
                    GROUP BY
                        post_id
                ) bc ON posts.post_id = bc.post_id
                LEFT JOIN bookmarks 
                ON posts.post_id = bookmarks.post_id AND bookmarks.user_id = ?
                LEFT JOIN users
                ON posts.user_id = users.id;
        `

        const postsList = await db.all(getPostsQuery, [userId, userId])

        response.send({postsList})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Create post
app.post("/posts", authenticateToken, upload.single("imageFile"), async (request, response) => {
    try {
        const {userId} = request
        const {textContent} = request.body
        const imageFile = request.file

        if (!textContent && !imageFile) {
            response.status(400)
            response.send({error: "Post can't be empty"})
            return
        }

        if (imageFile) {
            if (!imageFile.mimetype.startsWith('image/')) {
                response.status(400)
                response.send({error: "Only image uploads are allowed"})
                return
            }
        }

        let imageUrl = null 

        if (imageFile) {
            try {
                imageUrl = await uploadToCloudinary(imageFile.buffer)
            } catch (error) {
                response.status(500)
                response.send({ error: "Image upload failed" })
                return
            }
        }

        await createPost({userId, textContent, imageUrl})

        response.status(200)
        response.send({message: "Posted Successfully"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// delete post
app.delete("/posts/:postId", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {postId} = request.params

        const checkPostExistQuery = `
            SELECT
                post_id
            FROM
                posts
            WHERE
                post_id = ? AND user_id = ?;
        `

        const post = await db.get(checkPostExistQuery, [postId, userId])

        if (!post) {
            response.status(401)
            response.send({error: "Post does not exist"})
            return
        }

        const deletePostQuery = `
            DELETE FROM posts
            WHERE
                post_id = ? AND user_id = ?;
        `

        await db.run(deletePostQuery, [postId, userId])

        response.send({message: "Post Deleted Successfully"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Add Bookmark
app.post("/bookmarks/:postId", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {postId} = request.params

        const getPostQuery = `
            SELECT
                post_id
            FROM
                posts
            WHERE
                post_id = ?;
        `

        const post = await db.get(getPostQuery, [postId])

        if (!post) {
            response.status(401)
            response.send({error: "Post not found"})
            return
        }

        const checkAlreadyBookmark = `
            SELECT
                id
            FROM
                bookmarks
            WHERE
                user_id = ? AND post_id = ?;
        `

        const isBookmarkExists = await db.get(checkAlreadyBookmark, [userId, postId])

        if (isBookmarkExists) {
            response.status(409)
            response.send({error: "Post Already Bookmarked"})
            return
        }

        const addToBookmarkQuery = `
            INSERT INTO bookmarks (user_id, post_id)
            VALUES (?, ?);
        `

        await db.run(addToBookmarkQuery, [userId, postId])

        response.status(201)
        response.send({message: "Post Bookmarked Successfully"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Remove Bookmark
app.delete("/bookmarks/:postId", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {postId} = request.params

        const getPostQuery = `
            SELECT
                post_id
            FROM
                posts
            WHERE
                post_id = ?;
        `

        const post = await db.get(getPostQuery, [postId])

        if (!post) {
            response.status(404)
            response.send({error: "Post not found"})
            return
        }

        const removeBookmarkQuery = `
            DELETE FROM bookmarks
            WHERE
                post_id = ? AND user_id = ?;
        `

        await db.run(removeBookmarkQuery, [postId, userId])

        response.send({message: "Post removed from bookmark"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// GET Bookmark List
app.get("/bookmarks", authenticateToken, async (request, response) => {
    try {
        const {userId} = request

        const getUserQuery = `
            SELECT
                id
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.get(getUserQuery, [userId])

        if (!user) {
            response.status(404)
            response.send("User not found")
            return
        }

        const getBookmarkedPostsListQuery = `
            SELECT
                users.username,
                posts.user_id,
                posts.post_id,
                posts.text_content,
                posts.image_url,
                posts.created_at,
                COALESCE(lc.likes_count, 0) AS likes_count,
                CASE
                    WHEN likes.user_id IS NOT NULL THEN 1
                    ELSE 0
                END
                AS is_liked,
                COALESCE(bc.bookmark_count, 0) AS bookmark_count,
                CASE
                    WHEN bookmarks.user_id IS NOT NULL THEN 1
                    ELSE 0
                END
                AS is_bookmarked
            FROM
                posts
                LEFT JOIN (
                    SELECT
                        post_id,
                        COUNT(*) AS likes_count
                    FROM
                        likes
                    GROUP BY
                        post_id
                ) lc ON posts.post_id = lc.post_id
                LEFT JOIN likes
                ON posts.post_id = likes.post_id AND likes.user_id = ?
                INNER JOIN (
                    SELECT
                        post_id,
                        COUNT(*) AS bookmark_count
                    FROM
                        bookmarks
                    GROUP BY
                        post_id
                ) bc ON posts.post_id = bc.post_id
                INNER JOIN bookmarks
                ON posts.post_id = bookmarks.post_id AND bookmarks.user_id = ?
                INNER JOIN users
                ON posts.user_id = users.id;
        `

        const bookmarkedPostList = await db.all(getBookmarkedPostsListQuery, [userId, userId])

        response.status(200)
        response.send({bookmarkedPostList})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Like Post
app.post("/posts/:postId/likes", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {postId} = request.params

        const checkPostExistQuery = `
            SELECT
                post_id
            FROM
                posts
            WHERE
                post_id = ?;
        `

        const post = await db.get(checkPostExistQuery, [postId])

        if (!post) {
            response.status(404)
            response.send({error: "Post does not exist"})
            return
        }

        const insertLikeQuery = `
            INSERT INTO likes (user_id, post_id)
            VALUES (?, ?);
        `

        await db.run(insertLikeQuery, [userId, postId])

        response.send({message: "Liked Successfully"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Remove Like 
app.delete("/posts/:postId/likes", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {postId} = request.params

        const checkPostExistQuery = `
            SELECT
                post_id
            FROM
                posts
            WHERE
                post_id = ?;
        `

        const post = await db.get(checkPostExistQuery, [postId])

        if (!post) {
            response.status(404)
            response.send({error: "Post does not exist"})
            return
        }

        const removeLikeQuery = `
            DELETE FROM likes
            WHERE
                user_id = ? AND post_id = ?;
        `

        await db.run(removeLikeQuery, [userId, postId])

        response.send({message: "Like Removed Successfully"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Create idea
app.post("/ideas", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {content} = request.body

        trimmedContent = content.trim()

        if (!trimmedContent) {
            response.status(400) 
            response.send({error: "Nothing to save"})
            return
        }

        const createIdeaQuery = `
            INSERT INTO ideas (user_id, content)
            VALUES (?, ?);
        `

        const result = await db.run(createIdeaQuery, [userId, trimmedContent]);

        response.status(200)
        response.send({message: "Idea saved"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Get ideas list
app.get("/ideas", authenticateToken, async (request, response) => {
    try {
        const {userId} = request

        const getUserQuery = `
            SELECT
                id
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.get(getUserQuery, [userId])

        if (!user) {
            response.status(404) 
            response.send({error: "User not found"})
            return
        }

        const getUsersIdeasListQuery = `
            SELECT
                id,
                content
            FROM
                ideas
            WHERE
                user_id = ?;
        `

        const ideasList = await db.all(getUsersIdeasListQuery, [userId])

        response.send({ideasList})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})  

// Update Idea
app.put("/ideas/:ideaId", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {ideaId} = request.params
        const {content} = request.body

        const getUserQuery = `
            SELECT
                id 
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.get(getUserQuery, [userId])

        if (!user) {
            response.status(404)
            response.send({error: "User not found"})
            return
        }

        const getIdeaQuery = `
            SELECT
                id
            FROM
                ideas
            WHERE
                id = ? AND user_id = ?;
        `

        const idea = await db.get(getIdeaQuery, [ideaId, userId])

        if (!idea) {
            response.status(404)
            response.send({error: "Idea not found"})
            return
        }

        const updateIdeaQuery = `
            UPDATE 
                ideas
            SET 
                content = ?
            WHERE
                id = ? AND user_id = ?;
        `

        await db.run(updateIdeaQuery, [content, ideaId, userId])

        response.status(200)
        response.send({message: "Idea Updated"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// delete idea
app.delete("/ideas/:ideaId", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {ideaId} = request.params

        const getUserQuery = `
            SELECT
                id
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.get(getUserQuery, [userId])

        if (!user) {
            response.status(404)
            response.send({error: "User not found"})
            return
        }

        const checkIdeaExistQuery = `
            SELECT
                id
            FROM
                ideas
            WHERE
                id = ? and user_id = ?;
        `

        const idea = await db.get(checkIdeaExistQuery, [ideaId, userId])

        if (!idea) {
            response.status(404)
            response.send({error: "Ideas not exists"})
            return
        }

        const deleteIdeaQuery = `
            DELETE FROM ideas
            WHERE
                id = ? AND user_id = ?
        `

        await db.run(deleteIdeaQuery, [ideaId, userId])

        response.status(200)
        response.send({message: "Idea deleted"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Get users own post 
app.get("/users/:userId/posts", authenticateToken, async (request, response) => {
    try {
        const {userId} = request.params

        const getUserQuery = `
            SELECT
                id
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.get(getUserQuery, [userId])

        if (!user) {
            response.status(404)
            response.send({error: "User not found"})
            return
        }

        const getUsersPostListQuery = `
            SELECT
                posts.user_id,
                users.username,
                posts.post_id,
                posts.text_content,
                posts.image_url,
                COALESCE(lc.likes_count, 0) AS likes_count,
                CASE
                    WHEN likes.user_id IS NOT NULL THEN 1
                    ELSE 0
                END
                AS is_liked,
                COALESCE(bc.bookmark_count, 0) AS bookmark_count,
                CASE
                    WHEN bookmarks.user_id IS NOT NULL THEN 1
                    ELSE 0
                END AS is_bookmarked,                    
                posts.created_at
            FROM
                posts
                LEFT JOIN (
                    SELECT
                        post_id,
                        COUNT(*) AS likes_count
                    FROM
                        likes
                    GROUP BY
                        post_id
                ) lc ON posts.post_id = lc.post_id
                LEFT JOIN likes
                ON posts.post_id = likes.post_id AND likes.user_id = ?
                LEFT JOIN (
                    SELECT
                        post_id,
                        COUNT(*) AS bookmark_count
                    FROM
                        bookmarks
                    GROUP BY
                        post_id
                ) bc ON posts.post_id = bc.post_id
                LEFT JOIN bookmarks 
                ON posts.post_id = bookmarks.post_id AND bookmarks.user_id = ?
                INNER JOIN users
                ON posts.user_id = users.id
            WHERE
                posts.user_id = ?;
        `

        const postsList = await db.all(getUsersPostListQuery, [userId, userId, userId])

        response.send({postsList})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Get user profile data (for UI)
app.get("/users/:userId/profile", authenticateToken, async (request, response) => {
    try {
        const {userId} = request.params

        const getUserQuery = `
            SELECT
                id 
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.get(getUserQuery, [userId])

        if (!user) {
            response.status(404)
            response.send("User not found")
            return
        }

        const getUserProfileDataQuery = `
            SELECT
                users.username,
                users.created_at,
                profiles.full_name,
                profiles.bio,
                profiles.profession,
                profiles.social_link,
                profiles.id,
                profiles.user_id
            FROM
                users
                LEFT JOIN profiles
                ON users.id = profiles.user_id
            WHERE
                users.id = ?;
        `

        const userProfileData = await db.get(getUserProfileDataQuery, [userId])

        response.send({userProfileData})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Get user profile data (for editing)
app.get("/profile", authenticateToken, async (request, response) => {
    try {
        const {userId} = request

        const getUserQuery = `
            SELECT
                *
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.get(getUserQuery, [userId])

        if (!user) {
            response.status(404)
            response.send({error: "User not found"})
            return
        }

        const getUserProfileData = `
            SELECT
                users.username,
                users.created_at,
                profiles.full_name,
                profiles.bio,
                profiles.profession,
                profiles.social_link,
                profiles.id
            FROM
                users
                LEFT JOIN profiles
                ON users.id = profiles.user_id
            WHERE
                users.id = ?;
        `

        const userProfileData = await db.get(getUserProfileData, [userId])

        response.send({userProfileData})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Create user profile
app.post("/profile", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {fullName, bio, profession, socialLink} = request.body

        if (bio.length > 150) {
            response.status(400)
            response.send({error: "Bio can't be more than 150 characters"})
            return
        }

        const getProfileQuery = `
            SELECT
                id
            FROM
                profiles
            WHERE
                user_id = ?;
        `

        const profile = await db.get(getProfileQuery, [userId])

        if (profile) {
            response.status(409)
            response.send({error: "Profile already exist"})
            return 
        }

        const createUserProfileQuery = `
            INSERT INTO profiles (user_id, full_name, bio, profession, social_link)
            VALUES (?, ?, ?, ?, ?);
        `

        await db.run(createUserProfileQuery, [userId, fullName, bio, profession, socialLink])

        response.send({message: "Profile Created Successfully"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Update user profile data
app.put("/profile", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {fullName, bio,  profession, socialLink} = request.body

        if (bio.length > 150) {
            response.status(400)
            response.send({error: "Bio can't be more than 150 characters"})
            return
        }

        const getUserQuery = `
            SELECT
                id
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.run(getUserQuery, [userId])

        if (!user) {
            response.status(404)
            response.send({error: "User not found"})
            return
        }

        const updateUserProfileQuery = `
            UPDATE
                profiles
            SET
                full_name = ?,
                bio = ?,
                profession = ?,
                social_link = ?
            WHERE
                user_id = ?;
        `

        await db.run(updateUserProfileQuery, [fullName, bio, profession, socialLink, userId])

        response.send({message: "Profile Updated Successfully"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Get Searched Users List
app.get("/search", authenticateToken, async (request, response) => {
    try {
        const {search_query} = request.query

        const getUsersList = `
            SELECT
                users.id,
                users.username,
                profiles.full_name AS fullName
            FROM
                users
                LEFT JOIN profiles
                ON users.id = profiles.user_id
            WHERE
                users.username LIKE ? OR
                (profiles.full_name IS NOT NULL AND profiles.full_name LIKE ?);
        `

        const searchPattern = `%${search_query}%`
        const usersList = await db.all(getUsersList, [searchPattern, searchPattern])

        response.send({usersList})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Follow User
app.post("/users/:id/follow", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {id} = request.params
    
        if (userId === parseInt(id)) {
            response.status(409)
            response.send({error: "You can't follow yourself"})
            return
        }
    
        const getUserQuery = `
            SELECT
                id
            FROM
                users
            WHERE
                id = ?;
        `
    
        const user = await db.get(getUserQuery, [id])
    
        if (!user) {
            response.status(404)
            response.send({error: "User not found"})
            return
        } 
    
        const createFollowerQuery = `
            INSERT INTO followers (follower_user_id, following_user_id)
            VALUES (?, ?);
        `
    
        await db.run(createFollowerQuery, [userId, id])
    
        response.send({message: "Followed successfully"})
  
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// Unfollow User
app.delete("/users/:id/follow", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {id} = request.params

        if (userId === parseInt(id)) {
            response.status(409)
            response.send({error: "You can't unfollow yourself"})
            return
        }
        
        const getUserQuery = `
            SELECT
                id
            FROM
                users
            WHERE
                id = ?;
        `
        
        const user = await db.get(getUserQuery, [id])
        
        if (!user) {
            response.status(404)
            response.send({error: "User not found"})
            return
        }

        const unfollowUserQuery = `
            DELETE FROM followers
            WHERE
                follower_user_id = ? AND
                following_user_id = ?;
        `

        await db.run(unfollowUserQuery, [userId, id])

        response.send({message: "Unfollowed Successfully"})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})

// get user follower-following data
app.get("/users/:id/follow", authenticateToken, async (request, response) => {
    try {
        const {userId} = request
        const {id} = request.params

        const getUserQuery = `
            SELECT
                id
            FROM
                users
            WHERE
                id = ?;
        `

        const user = await db.get(getUserQuery, [id])

        if (!user) {
            response.status(404)
            response.send({error: "User not found"})
            return
        }

        const getUserFollowDataQuery = `
            SELECT
                (
                    SELECT COUNT(id)
                    FROM followers
                    WHERE following_user_id = ?
                ) AS followersCount,
                (
                    SELECT COUNT(id)
                    FROM followers
                    WHERE follower_user_id = ?
                ) AS followingCount,
                EXISTS (
                    SELECT 1
                    FROM followers
                    WHERE follower_user_id = ? AND following_user_id = ?
                ) AS isFollowing;
        `

        const userFollowData = await db.get(getUserFollowDataQuery, [id, id, userId, id])

        response.send({userFollowData})
    } catch (error) {
        response.status(500)
        response.send({error: "Internal server error"})
    }
})
