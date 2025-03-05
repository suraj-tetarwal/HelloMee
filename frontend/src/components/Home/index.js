import {Component} from 'react'

import Header from '../Header'
import PostFeed from '../PostFeed'
import BottomNavbar from '../BottomNavbar'

import {
    HomeContainer,
} from './styledComponents'

class Home extends Component {
    render() {
        return (
            <HomeContainer>
                <Header />
                <PostFeed />
                <BottomNavbar />
            </HomeContainer>
        )
    }
}

export default Home