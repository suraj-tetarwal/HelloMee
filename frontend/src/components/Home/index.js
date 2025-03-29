import {Component} from 'react'

import LeftSidebar from '../LeftSidebar'
import Header from '../Header'
import PostFeed from '../PostFeed'
import BottomNavbar from '../BottomNavbar'
import AIChatBot from '../AIChatBot'

import {
    HomeContainer,
} from './styledComponents'

class Home extends Component {
    render() {
        return (
            <HomeContainer>
                <Header />
		<LeftSidebar />
                <PostFeed />
		<AIChatBot />
                <BottomNavbar />
            </HomeContainer>
        )
    }
}

export default Home