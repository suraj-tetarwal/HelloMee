import {Component} from 'react'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'

import { BiSolidEdit } from "react-icons/bi"

import AuthContext from '../../AuthContext'

import EditProfile from '../EditProfile'
import PostCard from '../PostCard'

import './index.css'

class Profile extends Component {
    state = {
        isEditing: false,
        userProfileData: {},
        userFollowData: {},
        postsList: []
    }

    openEdit = () => {
        this.setState({isEditing: true})
    }

    closeEdit = () => {
        this.setState({isEditing: false})
    }

    handleUnfollow = async () => {
        try {
            const jwtToken = Cookies.get("jwtToken")

            const profileUserId = this.getProfileUserId() 

            const url = `https://hellomee-1.onrender.com/users/${profileUserId}/follow`
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(url, options)
            const data = await response.json() 

            if (response.ok) {
                const {message} = data
                toast.success(message)
                this.setState(prevState => ({userFollowData: {
                    ...prevState.userFollowData, 
                    isFollowing: !prevState.userFollowData.isFollowing, 
                    followersCount: prevState.userFollowData.followersCount-1
                }}))
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    handleFollow = async () => {
        try {
            const jwtToken = Cookies.get("jwtToken")

            const profileUserId = this.getProfileUserId() 

            const url = `https://hellomee-1.onrender.com/users/${profileUserId}/follow`
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(url, options)
            const data = await response.json() 

            if (response.ok) {
                const {message} = data
                toast.success(message)
                this.setState(prevState => ({userFollowData: {
                    ...prevState.userFollowData, 
                    isFollowing: !prevState.userFollowData.isFollowing, 
                    followersCount: prevState.userFollowData.followersCount+1
                }}))
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    updateLikeState = (postId) => {
        this.setState(prevState => ({
            postsList: prevState.postsList.map(eachPost => {
                if (eachPost.postId === postId) {
                    const currentLikeStatus = eachPost.isLiked
                    return {
                        ...eachPost,
                        isLiked: !currentLikeStatus,
                        likesCount: currentLikeStatus ? eachPost.likesCount - 1 : eachPost.likesCount + 1
                    }    
                }
                return eachPost
            })
        }))
    }

    toggleLike = async (postId) => {
        try {
            const jwtToken = Cookies.get("jwtToken")
        
            const {postsList} = this.state
            const [postItem] = postsList.filter(eachPost => eachPost.postId === postId)
            const {isLiked}= postItem
        
            const url = `https://hellomee-1.onrender.com/posts/${postId}/likes`
            const options = {
                method: isLiked ? "DELETE" : "POST",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            }
        
            const response = await fetch(url, options)
            const data = await response.json()
            
            if (response.ok) {
                this.updateLikeState(postId)
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    updateBookmarkState = (postId) => {
        this.setState(prevState => ({
            postsList: 
                    prevState.postsList.map(eachPost => {
                        if (eachPost.postId === postId) {
                        const currentBookmarkStauts = eachPost.isBookmarked
                        return {
                            ...eachPost,
                            isBookmarked: !currentBookmarkStauts,
                            bookmarkCount: currentBookmarkStauts ? eachPost.bookmarkCount - 1 : eachPost.bookmarkCount + 1
                        }
                    }
                    return eachPost
            })
        }))
    }

    toggleBookmark = async (postId) => {
        try {
            const jwtToken = Cookies.get("jwtToken")
        
            const {postsList} = this.state
            const [postItem] = postsList.filter(eachpost => eachpost.postId === postId)
            const {isBookmarked} = postItem
        
            const url = `https://hellomee-1.onrender.com/bookmarks/${postId}`
            const options = {
                method: isBookmarked ? "DELETE" : "POST",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        
            const response = await fetch(url, options)
            const data = await response.json()
        
            if (response.ok) {
                this.updateBookmarkState(postId)
            } else {
                const {error} = data 
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    updateDeleteState = (postId) => {
        this.setState(prevState => ({
            postsList: prevState.postsList.filter(eachPost => eachPost.postId !== postId)
        }))
    }

    handleDeletePost = async (postId) => {
        try {
            const jwtToken = Cookies.get("jwtToken")

            const url = `https://hellomee-1.onrender.com/posts/${postId}`
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                const {message} = data
                toast.success(message)
                this.updateDeleteState(postId)
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    getProfileUserId = () => {
        const {match} = this.props
        const {params} = match
        const {id} = params
        return id
    }

    fetchUserPosts = async () => {
        try {
            const jwtToken = Cookies.get("jwtToken")
        
            const profileUserId = this.getProfileUserId()

            const url = `https://hellomee-1.onrender.com/users/${profileUserId}/posts`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                const {postsList} = data
                const formattedPostList = postsList.map(eachPost => ({
                    userId: eachPost.user_id,
                    username: eachPost.username,
                    postId: eachPost.post_id,
                    textContent: eachPost.text_content,
                    imageUrl: eachPost.image_url,
                    likesCount: eachPost.likes_count,
                    isLiked: eachPost.is_liked,
                    bookmarkCount: eachPost.bookmark_count,
                    isBookmarked: eachPost.is_bookmarked,
                    createdAt: eachPost.created_at
                }))
                this.setState({postsList: formattedPostList})
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    fetchUserFollowData = async () => {
        try {
            const jwtToken = Cookies.get("jwtToken")

            const profileUserId = this.getProfileUserId()

            const url = `https://hellomee-1.onrender.com/users/${profileUserId}/follow`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                const {userFollowData} = data
                this.setState({userFollowData})
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    fetchUserProfile = async () => {
        try {
            const jwtToken = Cookies.get("jwtToken")

            const profileUserId = this.getProfileUserId()

            const url = `https://hellomee-1.onrender.com/users/${profileUserId}/profile`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                const {userProfileData} = data
                console.log(userProfileData)
                const formattedProfileData = {
                    id: userProfileData.id,
                    userId: userProfileData.user_id,
                    username: userProfileData.username,
                    fullName: userProfileData.full_name,
                    bio: userProfileData.bio,
                    profession: userProfileData.profession,
                    socialLink: userProfileData.social_link,
                    createdAt: userProfileData.created_at
                }
                this.setState({userProfileData: formattedProfileData})
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    componentDidUpdate(prevProps) {
        const prevId = prevProps.match.params.id
        const currentId = this.props.match.params.id

        if (prevId !== currentId) {
            this.fetchUserProfile()
            this.fetchUserFollowData()
            this.fetchUserPosts()
        }
    }

    componentDidMount() {
        this.fetchUserProfile()
        this.fetchUserFollowData()
        this.fetchUserPosts()
    }

    getInitial = name => name?.trim()?.charAt(0)?.toUpperCase() || ''

    formatDate = dateString => {
        const date = new Date(dateString)
        const now = new Date()

        const diffInSeconds = Math.floor((now - date) / 1000)

        const minutes = Math.floor(diffInSeconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (diffInSeconds < 60) {
            return "Just now"
        }

        if (minutes < 60) {
            return `${minutes} min${minutes > 1 ? "s" : ""} ago`
        }

        if (hours < 24) {
            return `${hours} hour${hours > 1 ? "s" : ""} ago`
        }

        if (days < 7) {
            return `${days} day${days > 1 ? "s" : ""} ago`
        }

        return date.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
})
    }


    render() {
        return (
            <AuthContext.Consumer>
                {value => {
                    const {isEditing, userProfileData, userFollowData, postsList} = this.state
                    const {username, fullName, bio, profession, socialLink, createdAt} = userProfileData
                    const {followersCount, followingCount, isFollowing} = userFollowData 
                    const initial = this.getInitial(username)
                    const profileUserId = this.getProfileUserId()
                    const {loggedInUserId} = value
                    return (
                        <>
                            {
                                isEditing ? (
                                    <EditProfile closeEdit={this.closeEdit} />
                                ) : (
                                    <div className="profile-component-container">
                                        <div className="profile-header-container">
                                            <div className="user-avatar-container">
                                                <div className="profile-edit-button-container">
                                                    <div className="username-initial-container">{initial}</div>
                                                    {
                                                        loggedInUserId === parseInt(profileUserId) ? (
                                                            <button type="button" className="edit-profile-button" onClick={this.openEdit}>
                                                                <BiSolidEdit className="edit-profile-button-icon" />    
                                                            </button> 
                                                        ) : null
                                                    }
                                                </div>
                                                <div className="profile-actions-container">
                                                    <div className="follow-stats-container">
                                                        <div className="follow-stat">
                                                            <p className="follow-label">Followers</p>
                                                            <p className="follow-count">{followersCount}</p>
                                                        </div>
                                                        <div className="follow-stat">
                                                            <p className="follow-label">Following</p>
                                                            <p className="follow-count">{followingCount}</p>
                                                        </div>
                                                    </div>
                                                    {
                                                        loggedInUserId !== parseInt(profileUserId) ? (
                                                                isFollowing ? <button type="button" onClick={this.handleUnfollow} className="unfollow-button">Unfollow</button> 
                                                                :  <button type="button" onClick={this.handleFollow} className="follow-button">Follow</button>
                                                        ) : null
                                                    }
                                                </div> 
                                            </div>
                                            <p className="profile-user-fullname">{fullName || username}</p>
                                            <p className="profile-username">@{username}</p>
                                            <p className="profile-user-bio">{bio || "No bio added yet"}</p>
                                            <p className="profile-user-profession">{profession || "Add your profession"}</p>
                                            {
                                                socialLink ? <a href={socialLink} className="profile-user-social-link">{socialLink}</a> : null
                                            }
                                            <p className="profile-user-join-date">Joined {this.formatDate(createdAt)}</p>
                                        </div>
                                        {
                                            postsList.length === 0 ? (
                                                <div className="user-posts-container">
                                                    <p className="no-posts-text">No Posts Yet</p>
                                                </div>
                                            ) : (
                                                <ul className="user-profile-posts-container">
                                                    {
                                                        postsList.map(eachPost => (
                                                            <PostCard 
                                                                postData={eachPost}
                                                                key={eachPost.postId} 
                                                                toggleLike={this.toggleLike} 
                                                                toggleBookmark={this.toggleBookmark}
                                                                handleDeletePost={this.handleDeletePost}
                                                            />
                                                        ))
                                                    }
                                                </ul>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}

export default Profile

