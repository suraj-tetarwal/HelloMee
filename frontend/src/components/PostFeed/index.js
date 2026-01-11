import {Component} from 'react'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
import {TailSpin} from 'react-loader-spinner'

import PostCard from '../PostCard'

import './index.css'

const apiStatusConstants = {
    INITIAL: "INITIAL",
    IN_PROGRESS: "IN_PROGRESS",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
}

class PostFeed extends Component {
    state = {
        postsList: [],
        apiStatus: apiStatusConstants.INITIAL
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

    fetchPosts = async () => {
        try {
            this.setState({apiStatus: apiStatusConstants.IN_PROGRESS})
            const jwtToken = Cookies.get("jwtToken")
            const url = "https://hellomee-1.onrender.com/posts"
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                const {postsList} = data
                const formattedData = postsList.map(eachPost => {
                    return {
                        userId: eachPost.user_id,
                        username: eachPost.username,
                        postId: eachPost.post_id,
                        textContent: eachPost.text_content,
                        imageUrl: eachPost.image_url,
                        createdAt: eachPost.created_at,
                        likesCount: eachPost.likes_count,
                        isLiked: eachPost.is_liked,
                        bookmarkCount: eachPost.bookmark_count,
                        isBookmarked: eachPost.is_bookmarked
                    }
                })
                this.setState({postsList: formattedData, apiStatus: apiStatusConstants.SUCCESS})
            } else {
                const {error} = data
                this.setState({apiStatus: apiStatusConstants.FAILURE})
                toast.error(error)
            }
        } catch(error) {
            this.setState({apiStatus: apiStatusConstants.FAILURE})
            toast.error("Something went wrong")
        }
    }

    renderPosts = () => {
        const {postsList} = this.state
        return (
            <ul className="post-list-container">
                    {
                        postsList.length === 0 ? (
                            <h1 className="empty-post-feed-text">Nothing to show</h1>
                        ) : (
                            postsList.map(eachPost => (
                                <PostCard 
                                    postData={eachPost} 
                                    key={eachPost.postId}
                                    toggleLike={this.toggleLike}
                                    toggleBookmark={this.toggleBookmark}
                                    handleDeletePost={this.handleDeletePost} 
                                />
                            ))
                        )
                    }
            </ul>
        )
    }

    renderLoader = () => {
        return (
            <div className="loader-container">
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#007BFF"
                    ariaLabel="tail-spin-loading"
                    radius="2"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    handleRetry = () => {
        this.fetchPosts()
    }

    renderFailureView = () => {
        return (
            <div className="failure-message-container">
                <p className="failure-message-text">Something went wrong</p>
                <button onClick={this.handleRetry} className="retry-button">Retry</button>
            </div>
        )
    }

    renderPostsView = () => {
        const {apiStatus} = this.state

        switch (apiStatus) {
            case apiStatusConstants.IN_PROGRESS:
                return this.renderLoader()
            case apiStatusConstants.SUCCESS:
                return this.renderPosts()
            case apiStatusConstants.FAILURE:
                return this.renderFailureView()
            default:
                return this.renderPosts()
        }
    }

    componentDidMount() {
        this.fetchPosts()
    }

    render() {
        return (
            <div className="post-feed-container">
                {this.renderPostsView()}
            </div>
        )
    }
}

export default PostFeed