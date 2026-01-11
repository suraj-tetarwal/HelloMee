import { FaFire, FaBookmark } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

import AuthContext from '../../AuthContext'

import './index.css'

const PostCard = (props) => {
    const {postData, toggleLike, toggleBookmark, handleDeletePost} = props
    const {
        userId, 
        username, 
        postId, 
        textContent, 
        imageUrl, 
        createdAt, 
        likesCount, 
        isLiked, 
        bookmarkCount, 
        isBookmarked
    } = postData

    const onClickLike = () => {
        toggleLike(postId)
    }

    const onClickBookmark = () => {
        toggleBookmark(postId)
    }

    const onClickDelete = () => {
        handleDeletePost(postId)
    }

    const getInitial = name => name?.trim()?.charAt(0)?.toUpperCase() || ''

    const formatDate = dateString => {
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

    return (
        <AuthContext.Consumer>
            {value => {
                const {loggedInUserId} = value
                return (
                    <li className="post-card-container">
                        <div className="post-card-header-container">
                            <div className="post-card-header-profile-container">
                                {getInitial(username)}
                            </div>
                            <div className="post-meta-data-container">
                                <p className="username">lordSKTe</p>
                                <p className="posted-time">{formatDate(createdAt)}</p>
                            </div>
                        </div>
                        <div className="post-content-container">
                            <p className="post-text-content">{textContent}</p>
                            {
                                imageUrl && (
                                    <div className="post-media-container">
                                        <img src={imageUrl} alt="post-media" className="post-media" />
                                    </div>
                                )
                            }
                        </div>
                        <div className="post-footer-container">
                            <div className="post-action-button-container">
                                <button className="action-button" onClick={onClickLike}>
                                    <FaFire className={`action-icon ${isLiked ? "active-like-icon" : null}`} />
                                </button>
                                <p className="post-action-count">{likesCount}</p>
                            </div>
                            <div className="post-action-button-container">
                                <button className="action-button" onClick={onClickBookmark}>
                                    <FaBookmark className={`action-icon ${isBookmarked ? "active-bookmark-icon" : null}`} />
                                </button>
                                <p className="post-action-count">{bookmarkCount}</p>
                            </div>
                            {
                                loggedInUserId === userId ? (
                                    <div className="delete-post-action-button-container">
                                        <button className="action-button" onClick={onClickDelete}>
                                            <MdDelete className="action-icon" />
                                        </button>
                                    </div>
                                ) : null
                            }
                        </div>
                    </li>
                )
            }}
        </AuthContext.Consumer>
    )
}

export default PostCard