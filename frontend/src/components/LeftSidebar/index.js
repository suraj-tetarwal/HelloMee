import { Component } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

import {
	SidebarContainer,
	LogoText,
	TopContainer,
	SidebarMenuContainer,
	UserIcon,
	HomeIcon,
	SearchIcon,
	PlusIcon,
	BookmarkIcon,
	SettingIcon,
	ActionButton,
	SidebarItemContainer,
	Active,
	SidebarItemText,
	LogoutButton,
} from './styledComponents'

class LeftSidebar extends Component {
	handleNavigation = (path) => {
		const {history} = this.props
		history.push(path)
	}

	handleLogout = () => {
		const {history} = this.props
		Cookies.remove("jwt_token")
		toast.info("You've logged out. See you next time!")
		history.replace("sign-in")
	}

	render() {
		const {location} = this.props
		return (
			<SidebarContainer>
				<TopContainer>
					<LogoText>HelloMee.com</LogoText>
					<SidebarMenuContainer>
						<SidebarItemContainer>
							<ActionButton
								onClick={() => this.handleNavigation('/profile')}
								active={location.pathname === '/profile' ? "true" : "false"}
							>
								<UserIcon />
								<SidebarItemText>Profile</SidebarItemText>
							</ActionButton>
						</SidebarItemContainer>
						<SidebarItemContainer>
							<ActionButton
								onClick={() => this.handleNavigation('/')}
								active={location.pathname === '/' ? "true" : "false"}
							>
								<HomeIcon />
								<SidebarItemText>Home</SidebarItemText>
							</ActionButton>
						</SidebarItemContainer>
						<SidebarItemContainer>
							<ActionButton
								onClick={() => this.handleNavigation('/search')}
								active={location.pathname === '/search' ? "true" : "false"}
							>
								<SearchIcon />
								<SidebarItemText>Search</SidebarItemText>
							</ActionButton>
						</SidebarItemContainer>
						<SidebarItemContainer>
							<ActionButton
								onClick={() => this.handleNavigation('/new-post')}
								active={location.pathname === '/new-post' ? "true" : "false"}
							>
								<PlusIcon />
								<SidebarItemText>New Post</SidebarItemText>
							</ActionButton>
						</SidebarItemContainer>
						<SidebarItemContainer>
							<ActionButton
								onClick={() => this.handleNavigation('/bookmark')}
								active={location.pathname === '/bookmark' ? "true" : "false"}
							>
								<BookmarkIcon />
								<SidebarItemText>Bookmark</SidebarItemText>
							</ActionButton>
						</SidebarItemContainer>
						<SidebarItemContainer>
							<ActionButton
								onClick={() => this.handleNavigation('/settings')}
								active={location.pathname === '/settings' ? "true" : "false"}
							>
								<SettingIcon />
								<SidebarItemText>Settings</SidebarItemText>
							</ActionButton>
						</SidebarItemContainer>
					</SidebarMenuContainer>
				</TopContainer>
				<LogoutButton type="button" onClick={this.handleLogout}>Logout</LogoutButton>
			</SidebarContainer>
		)
	}
}

export default withRouter(LeftSidebar)