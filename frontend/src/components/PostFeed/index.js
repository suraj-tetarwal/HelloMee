import { Component } from 'react'
import { Oval } from 'react-loader-spinner'

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
	apiStatus: apiStatusConstants.inProgress,
    }

    componentDidMount() {
        this.fetchPost()
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
	const {postList} = this.state
	return (
	    <PostListContainer>
		{
		    postList.map(eachPost => (
			<PostCard key={eachPost._id} postDetails={eachPost} />
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