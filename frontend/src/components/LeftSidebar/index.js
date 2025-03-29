import { Component } from 'react'

import {
	SidebarContainer,
	Heading,
} from './styledComponents'

class LeftSidebar extends Component {
	render() {
		return (
			<SidebarContainer>
				<Heading>Left Sidebar</Heading>
			</SidebarContainer>
		)
	}
}

export default LeftSidebar