import {Component} from 'react'

import Header from '../Header'
import PostCard from '../PostCard'

import {
    MainContainer,
    PostsContainer,
} from './styledComponents'

class Home extends Component {
    render() {
        return (
            <MainContainer>
                <Header />
                <PostsContainer>
                    <PostCard />
                </PostsContainer>
            </MainContainer>
        )
    }
}

export default Home