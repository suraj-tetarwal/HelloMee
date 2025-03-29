import { Component } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

import {
    PostContainer,
    PostHeader,
    ProfileContainer,
    ProfilePlaceholder,
    UserIcon,
    UserInfo,
    Username,
    PostTime,
    MenuIcon,
    PostContent,
    CaptionText,
    MediaContainer,
    Media,
    PostFooter,
    PostActionContainer,
    LikeCommentIconContainer,
    ActionButton,
    NonActiveLikeIcon,
    ActiveLikeIcon,
    CommentIcon,
    ShareIcon,
    NonActiveBookmarkIcon,
    ActiveBookmarkIcon,
    PostMetaContainer,
    PostMetaText,
    CommentsContainer,
    CommentFormContainer,
    CommentInput,
    CommentSubmitButton,
    SendIcon,
    CommentsListContainer,
    CommentItemContainer,
    CommentInfoContainer,
    CommentMetaDataContainer,
    CommentUsername,
    CommentTime,
    CommentText,
} from './styledComponents'

class PostCard extends Component {
    constructor(props) {
	super(props)

	const userId = this.getUserId()	
	this.state = {
	    likesCount: this.props.postDetails.likesCount,
	    isLiked: this.props.postDetails.likes.includes(userId),
	    showComments: false,
	    commentText: "",
	    comments: [],
	}
    } 

    componentDidMount = () => {
	this.fetchComments()
    }  

    getUserId = () => {
	const jwtToken = Cookies.get('jwt_token')
	return jwtToken ? jwtDecode(jwtToken).userId : null
    }

    timeAgo = (date) => {
        const seconds = Math.floor((Date.now() - new Date(date)) / 1000)
        const intervals = { year: 31536000, month: 2592000, week: 604800, day: 86400, hour: 3600, minute: 60 }
        
        for (let unit in intervals) {
            let count = Math.floor(seconds / intervals[unit]);
            if (count >= 1) return `${count} ${unit}${count > 1 ? "s" : ""} ago`
        }
    
        return "Just now"
    }

    handleLike = async () => {
	const {postDetails} = this.props
	const postId = postDetails._id
	const userId = this.getUserId()
	
	const {isLiked, likesCount} = this.state 

	this.setState((prevState) => ({
		likesCount: prevState.isLiked ? prevState.likesCount - 1 : prevState.likesCount + 1,
		isLiked: !prevState.isLiked,
	}))

	const jwtToken = Cookies.get('jwt_token')

	const url = `http://localhost:5000/posts/${postId}/like`
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwtToken}`,
		},
		body: JSON.stringify({userId})
	}

	const response = await fetch(url, options)
	
	if (!response.ok) {
		this.setState({isLiked, likesCount})
	}

    }

    fetchComments = async () => {
	const jwtToken = Cookies.get('jwt_token')

	const {postDetails} = this.props
	const postId = postDetails._id

	const url = `http://localhost:5000/posts/${postId}/comment`
	const options = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${jwtToken}`
		}
	}

	const response = await fetch(url, options)
	const data = await response.json()
	if (response.ok) {
		const {comments} = data
		this.setState({comments})
	}
    }

    toggleComments = () => {
	this.setState((prevState) => ({showComments: !prevState.showComments}))
    }

    onChangeComment = (event) => {
	this.setState({commentText: event.target.value})
    }

    handleCommentSubmit = async (event) => {
	event.preventDefault()

	const {commentText} = this.state
	const trimmedComment = commentText.trim()

	if (trimmedComment === "") return

	const toastId = toast.loading("Posting your comment...")

	const {postDetails} = this.props
	const postId = postDetails._id

	const jwtToken = Cookies.get('jwt_token')

	const url = `http://localhost:5000/posts/${postId}/comment`
	const options = {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${jwtToken}`,
	    },
	    body: JSON.stringify({text: trimmedComment})
	}

	const response = await fetch(url, options)

	const data = await response.json()
	if (response.ok) {
		const {message} = data 

		this.setState({showComments: false, commentText: ""})

		toast.update(toastId, {
			render: message,
			type: "success",
			isLoading: false,
			autoClose: 3000,
		})
	} else {
		const {error} = data
		toast.update(toastId, {
			render: error,
			type: "error",
			isLoading: false,
			autoClose: 3000,
		})
	}
    }
    
    handleBookmark = () => {
	const {postDetails, onBookmarkToggle} = this.props
	onBookmarkToggle(postDetails._id)
    }

    render() {
	const {postDetails, isBookmarked} = this.props
        let {username, profileUrl, caption, mediaUrl, createdAt} = postDetails 
	const {isLiked, likesCount, showComments, comments} = this.state
	return (
            <PostContainer>
                <PostHeader>
                    <ProfileContainer>
                        <ProfilePlaceholder>
                            <UserIcon />
                        </ProfilePlaceholder>    
                        <UserInfo>
                            <Username>{username}</Username>
                            <PostTime>{this.timeAgo(createdAt)}</PostTime>
                        </UserInfo>
                    </ProfileContainer>
                    <MenuIcon />
                </PostHeader>
                <PostContent>
		    {caption ? <CaptionText>{caption}</CaptionText> : null}
		    {
			    mediaUrl ? (
				    <MediaContainer>
					    <Media src={mediaUrl} alt="media" />
                		    </MediaContainer>
			    ) : null
		    }
                </PostContent>
                <PostFooter>
                    <PostActionContainer>
                        <LikeCommentIconContainer>
			    <ActionButton type="button" onClick={this.handleLike}>
				{
				    isLiked ? <ActiveLikeIcon /> : <NonActiveLikeIcon />
				}
			    </ActionButton>
			    <ActionButton type="button" onClick={this.toggleComments}>
			        <CommentIcon />
			    </ActionButton>
			    <ActionButton type="button">
			        <ShareIcon />
			    </ActionButton>
                        </LikeCommentIconContainer>
			<ActionButton type="button" onClick={this.handleBookmark}>
			    {isBookmarked ? <ActiveBookmarkIcon /> : <NonActiveBookmarkIcon />}
			</ActionButton>
                    </PostActionContainer>
		    {
			showComments ? (
			    <CommentsContainer>
				<CommentsListContainer>
				    {
					comments.map((eachComment) => (
					    <CommentItemContainer key={eachComment._id}>
						<ProfilePlaceholder>
                            			    <UserIcon />
                        			</ProfilePlaceholder>
						<CommentInfoContainer>
						    <CommentMetaDataContainer>
							<CommentUsername>{eachComment.username}</CommentUsername>
							<CommentTime>{this.timeAgo(eachComment.createdAt)}</CommentTime>
						    </CommentMetaDataContainer>
						    <CommentText>{eachComment.text}</CommentText>
						</CommentInfoContainer>
					    </CommentItemContainer>
					))
				    }
				</CommentsListContainer>
				<CommentFormContainer onSubmit={this.handleCommentSubmit}>
				    <CommentInput placeholder="Add a comment" onChange={this.onChangeComment}></CommentInput>
				    <CommentSubmitButton type="submit">
					<SendIcon />
				    </CommentSubmitButton>
				</CommentFormContainer>
		    	    </CommentsContainer>
			) : (
			    <PostMetaContainer>
                        	<PostMetaText>
                            	    {likesCount} {likesCount <= 1 ? 'Ignite' : 'Ignites'}
                        	</PostMetaText>
                        	<PostMetaText>
                            	    {comments.length} {comments.length <= 1 ? 'comment' : 'comments'}
                        	</PostMetaText>
                    	    </PostMetaContainer>
			)
		    }
                </PostFooter>
            </PostContainer>
        )
    }
}

export default PostCard