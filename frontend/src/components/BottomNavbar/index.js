import {
    BottomNavContainer,
    NavList,
    NavButton,
    NavItem,
    HomeIcon,
    SearchIcon,
    NewPostIcon,
    NotificationIcon,
    ChatIcon,
} from './styledComponents'

const BottomNavbar = () => {
    return (
        <BottomNavContainer>
            <NavList>
                <NavItem>
                    <NavButton>
                        <HomeIcon />
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton>
                        <SearchIcon />
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton>
                        <NewPostIcon />
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton>
                        <NotificationIcon />
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton>
                        <ChatIcon />
                    </NavButton>
                </NavItem>
            </NavList>
        </BottomNavContainer>
    )
}

export default BottomNavbar