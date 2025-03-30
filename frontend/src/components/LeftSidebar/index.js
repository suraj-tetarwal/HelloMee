import { Component } from 'react'

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
	SidebarItemContainer,
	Active,
	SidebarItemText,
	LogoutButton,
} from './styledComponents'

class LeftSidebar extends Component {
	render() {
		return (
			<SidebarContainer>
				<TopContainer>
					<LogoText>HelloMee.com</LogoText>
					<SidebarMenuContainer>
						<SidebarItemContainer>
							<UserIcon />
							<SidebarItemText>Profile</SidebarItemText>
						</SidebarItemContainer>
						<SidebarItemContainer>
							<HomeIcon />
							<SidebarItemText>Home</SidebarItemText>
						</SidebarItemContainer>
						<Active>
							<SearchIcon />
							<SidebarItemText>Search</SidebarItemText>
						</Active>
						<SidebarItemContainer>
							<PlusIcon />
							<SidebarItemText>New Post</SidebarItemText>
						</SidebarItemContainer>
						<SidebarItemContainer>
							<BookmarkIcon />
							<SidebarItemText>Bookmark</SidebarItemText>
						</SidebarItemContainer>
						<SidebarItemContainer>
							<SettingIcon />
							<SidebarItemText>Setting</SidebarItemText>
						</SidebarItemContainer>
					</SidebarMenuContainer>
				</TopContainer>
				<LogoutButton type="button">Logout</LogoutButton>
			</SidebarContainer>
		)
	}
}

export default LeftSidebar