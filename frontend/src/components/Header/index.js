import { FaUser } from "react-icons/fa6"
// import { IoMdSettings } from "react-icons/io"
import { HiOutlineMenu } from "react-icons/hi"

import {
    HeaderContainer,
    UserProfile,
    LogoText,
} from './styledComponents'

const Header = () => {
    return (
        <HeaderContainer>
            <UserProfile>
                <FaUser color="#FFFFFF" size="20px" />
            </UserProfile>
            <LogoText>Connecta</LogoText>
            <HiOutlineMenu color="#FFFFFF" size="30px" />
        </HeaderContainer>
    )
}

export default Header