import { BsChatText } from 'react-icons/bs'
import { GoHome, GoSearch } from 'react-icons/go'
import { IoNotificationsOutline, IoAddCircleOutline } from 'react-icons/io5'
import styled from 'styled-components'

export const BottomNavContainer = styled.div`
    background: rgba(10, 10, 10, 0.5);
    position: sticky;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #BDBDBD;
    backdrop-filter: blur(10px);
    padding: 16px;
    z-index: 100;
`

export const NavList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
`



export const NavButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
`

export const NavItem = styled.li`
    color: #FFFFFF;
`

export const HomeIcon = styled(GoHome)`
    color: #FFFFFF;
    font-size: 32px;
`

export const SearchIcon = styled(GoSearch)`
    color: #FFFFFF;
    font-size: 32px;
`

export const NewPostIcon = styled(IoAddCircleOutline)`
    color: #FFFFFF;
    font-size: 32px;
`

export const NotificationIcon = styled(IoNotificationsOutline)`
    color: #FFFFFF;
    font-size: 32px;
`

export const ChatIcon = styled(BsChatText)`
    color: #FFFFFF;
    font-size: 32px;
`