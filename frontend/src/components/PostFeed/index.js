import { Component } from 'react'

import PostCard from '../PostCard'

import { 
    PostFeedContainer,
} from './styledComponents'

class PostFeed extends Component {
    state = {
        postList: [],
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
            this.setState({postList: data})
        }
        else {
            console.log("Can't Fetch Post List")
        }
    } 

    render() {
        const {postList} = this.state
        return (
            <PostFeedContainer>
                <ul>
                    {
                        postList.map(eachPost => (
                            <PostCard key={eachPost._id} postDetails={eachPost} />
                        ))
                    }
                </ul>
            </PostFeedContainer>
        )
    }
}

export default PostFeed