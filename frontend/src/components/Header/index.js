import { FaUser } from "react-icons/fa6"

import {
    HeaderContainer,
    UserProfile,
    LogoText,
    LogoutButton,
} from './styledComponents'

const Header = () => {
    return (
        <HeaderContainer>
            <UserProfile>
                <FaUser color="#FFFFFF" size="20px" />
            </UserProfile>
            <LogoText>Connecta</LogoText>
            <LogoutButton>Log out</LogoutButton>
        </HeaderContainer>
    )
}

export default Header