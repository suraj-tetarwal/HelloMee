import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { BsChatText } from 'react-icons/bs'
import { GoHome, GoSearch } from 'react-icons/go'
import { IoNotificationsOutline, IoAddCircleOutline } from 'react-icons/io5'

import {
    BottomNavContainer,
    NavList,
    NavButton,
    NavItem,
} from './styledComponents'

class BottomNavbar extends Component {
	handleNavigation = (path) => {
		const {history} = this.props
		history.push(path)
	}

    	render() {
		const {location} = this.props
		return (
			<BottomNavContainer>
            			<NavList>
                			<NavItem>
                				<NavButton 
							onClick={() => this.handleNavigation('/')}
							active={location.pathname === '/' ? "true" : "false"}
						>
                					<GoHome />
                			    	</NavButton>
                			</NavItem>
                			<NavItem>
                			    	<NavButton
							onClick={() => this.handleNavigation('/search')}
							 active={location.pathname === '/search' ? "true" : "false"}
						>
                			        	<GoSearch />
                			    	</NavButton>
                			</NavItem>
                			<NavItem>
                			    	<NavButton
							onClick={() => this.handleNavigation('/new-post')}
							active={location.pathname === '/new-post' ? "true" : "false"} 
						>
                			        	<IoAddCircleOutline />
                			    	</NavButton>
                			</NavItem>
                			<NavItem>
                				<NavButton
							onClick={() => this.handleNavigation('/notifications')}
							 active={location.pathname === '/notifications' ? "true" : "false"}
						>
                			        	<IoNotificationsOutline />
                			    	</NavButton>
                			</NavItem>
                			<NavItem>
                		    		<NavButton
							onClick={() => this.handleNavigation('/chats')}
							 active={location.pathname === '/chats' ? "true" : "false"}
						>
                		    	    		<BsChatText />
                		    		</NavButton>
                			</NavItem>
            			</NavList>
        		</BottomNavContainer>
    		)
	}
}

export default withRouter(BottomNavbar)