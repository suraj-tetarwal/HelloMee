import { Component } from 'react'
import { Oval } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import {toast} from 'react-toastify'

import PostCard from '../PostCard'

import { 
    PostFeedContainer,
    PostListContainer,
    LoaderContainer,
    FailureViewContainer,
    ErrorMessage,
    RetryButton,
} from './styledComponents'

const apiStatusConstants = {
	success: 'SUCCESS',
	failure: 'FAILURE',
	inProgress: 'IN_PROGRESS',
}

class PostFeed extends Component {
    state = {
        postList: [],
	bookmark: [],
	apiStatus: apiStatusConstants.inProgress,
    }

    componentDidMount() {
        this.fetchPost()
	this.fetchBookmarks()
    }

    fetchPost = async () => {
        const url = "http://localhost:5000/posts/"
        const options = {
            method: "GET",
        }
        const response = await fetch(url, options)

        if (response.ok) {
            const data = await response.json()
            this.setState({postList: data, apiStatus: apiStatusConstants.success})
        }
        else {
	    this.setStatus({apiStatus: apiStatusConstants.failure})
        }
    }

    fetchBookmarks = async () => {
	const jwtToken = Cookies.get('jwt_token')
	const decoded = jwtDecode(jwtToken)
	const {userId} = decoded
	
	const url = `http://localhost:5000/profiles/${userId}/bookmarks`
	const options = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${jwtToken}`,
		},
	}

	const response = await fetch(url, options)
	const data = await response.json()

	if (response.ok) {
		const {bookmark} = data.result
		this.setState({bookmark})
	}
	else {
		const {error} = data
		toast.error(error)
	}
    }

    toggleBookmark = async (postId) => {
	this.setState((prevState) => ({
		bookmark: prevState.bookmark.includes(postId) ?
		prevState.bookmark.filter(id => id !== postId) : 
		[...prevState.bookmark, postId]
	}), () => this.updateBookmarkInDatabase(postId))
    }

    updateBookmarkInDatabase = async (postId) => {
	const jwtToken = Cookies.get('jwt_token')
	const decoded = jwtDecode(jwtToken)
	const {userId} = decoded

	const url = `http://localhost:5000/profiles/${userId}/bookmarks/`
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwtToken}`,
		},
		body: JSON.stringify({postId})
	}

	await fetch(url, options)
    }

    renderLoader = () => {
	return (
		<LoaderContainer>
			<Oval
				color="#FFFFFF"
				secondaryColor="#CCCCCC"
				strokeWidth={5}
				height="50"
				width="50"
			/>
		</LoaderContainer>
	)
    }

    renderPostsView = () => {
	const {postList, bookmark} = this.state
	return (
	    <PostListContainer>
		{
		    postList.map(eachPost => (
			<PostCard
				key={eachPost._id}
				postDetails={eachPost}
				isBookmarked={bookmark.includes(eachPost._id)}
				onBookmarkToggle={this.toggleBookmark}
			/>
		    ))
		}
	    </PostListContainer>
	)
    }

    renderFailureView = () => {
	return (
	    <FailureViewContainer>
		<ErrorMessage>Something went wrong.</ErrorMessage>
		<RetryButton type="button" onClick={this.fetchPost}>Retry</RetryButton>
	    </FailureViewContainer>
	)
    }

   renderPostFeedContent = () => {
	const {apiStatus} = this.state
	switch(apiStatus) {
	    case apiStatusConstants.success:
		return this.renderPostsView()
	    case apiStatusConstants.failure:
		return this.renderFailureView()
	    case apiStatusConstants.inProgress:
		return this.renderLoader()
	    default:
		return this.renderLoader()
	}	
   }

    render() {
        return (
            <PostFeedContainer>
		{this.renderPostFeedContent()}
            </PostFeedContainer>
        )
    }
}

export default PostFeed