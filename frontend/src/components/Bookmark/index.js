import {Component} from 'react'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
import { TailSpin } from 'react-loader-spinner'

import PostCard from '../PostCard'

import './index.css'

const apiStatusConstants = {
    INITIAL: "INITIAL",
    IN_PROGRESS: "IN_PROGRESS",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
}

class Bookmark extends Component {
    state = {
        bookmarkedPostList: [],
        apiStatus: apiStatusConstants.INITIAL
    }

    updateLikeState = (postId) => {
        this.setState(prevState => ({
            bookmarkedPostList: prevState.bookmarkedPostList.map(eachPost => {
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
        
            const {bookmarkedPostList} = this.state
            const [postItem] = bookmarkedPostList.filter(eachPost => eachPost.postId === postId)
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

    updateBookmarkPostList = (postId) => {
        this.setState(prevState => ({
            bookmarkedPostList: 
                    prevState.bookmarkedPostList.filter(eachPost => eachPost.postId !== postId)
        }))
    }

    toggleBookmark = async (postId) => {
        try {
            const jwtToken = Cookies.get("jwtToken")
        
            const {bookmarkedPostList} = this.state
            const [postItem] = bookmarkedPostList.filter(eachpost => eachpost.postId === postId)
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
                this.updateBookmarkPostList(postId)
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
            bookmarkedPostList: prevState.bookmarkedPostList.filter(eachPost => eachPost.postId !== postId)
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

    fetchBookmarkPosts = async () => {
        try {
            this.setState({apiStatus: apiStatusConstants.IN_PROGRESS})

            const jwtToken = Cookies.get("jwtToken")

            const url = "https://hellomee-1.onrender.com/bookmarks"
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                const {bookmarkedPostList} = data

                const formattedBookmarkPostList = bookmarkedPostList.map(eachPost => ({
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
                }))

                this.setState({bookmarkedPostList: formattedBookmarkPostList, apiStatus: apiStatusConstants.SUCCESS})
            } else {
                const {error} = data
                toast.error(error)
                this.setState({apiStatus: apiStatusConstants.FAILURE})
            }
        } catch(error) {
            this.setState({apiStatus: apiStatusConstants.FAILURE})
            toast.error("Something went wrong")
        }
    }

    renderBookmarkedPosts = () => {
        const {bookmarkedPostList} = this.state
        return (
            <>
                {
                    bookmarkedPostList.length === 0 ? (
                        <div className="empty-bookmark-post-text-container">
                            <p className="empty-bookmark-post-list-text">Nothing to show</p>
                        </div>
                    ) : (
                        <ul>
                            {
                                bookmarkedPostList.map(eachPost => 
                                    <PostCard 
                                        postData={eachPost} 
                                        key={eachPost.postId}
                                        toggleLike={this.toggleLike}
                                        toggleBookmark={this.toggleBookmark}
                                        handleDeletePost={this.handleDeletePost} 
                                    />
                                )
                            }
                        </ul>
                    )
                }
            </>
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
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    handleRetry = () => {
        this.fetchBookmarkPosts()
    }

    renderFailureView = () => {
        return (
            <div className="bookmark-error-message-container">
                <p className="bookmark-error-message">Something went wrong</p>
                <button onClick={this.handleRetry} className="bookmark-retry-button">Retry</button>
            </div>
        )
    }

    renderBookmarkView = () => {
        const {apiStatus} = this.state

        switch (apiStatus) {
            case apiStatusConstants.IN_PROGRESS:
                return this.renderLoader()
            case apiStatusConstants.SUCCESS:
                return this.renderBookmarkedPosts()
            case apiStatusConstants.FAILURE:
                return this.renderFailureView()
            default:
                return this.renderBookmarkedPosts()
        }
    }

    componentDidMount() {
        this.fetchBookmarkPosts()
    }

    render() {
        return (
            <div className="bookmark-component-container">
                {this.renderBookmarkView()}
            </div>
        )
    }
}

export default Bookmark