import styled from 'styled-components'

import { AiOutlineHome } from 'react-icons/ai'
import { IoSearchOutline, IoSettingsSharp, IoBookmark } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa6'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'

export const SidebarContainer = styled.div`
	display: none;

	@media screen and (min-width: 768px) {
		background-color: #000000;
		height: 100vh;
		width: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-right: 1px solid #808080;
		flex-grow: 1;
		padding: 24px;
	}
`

export const LogoText = styled.p`
	color: #FFFFFF;
	font-family: Montez;
	font-size: 32px;
	font-weight: 600;
	text-align: center;
	border-bottom: 1px solid #808080;
	padding-bottom: 16px;
`

export const TopContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`

export const SidebarMenuContainer = styled.ul`
	display: flex;
	flex-direction: column;
	margin-top: 16px;
`

export const UserIcon = styled(FaUser)`
	color: #FFFFFF;
	font-size: 20px;
`

export const HomeIcon = styled(AiOutlineHome)`
	color: #FFFFFF;
	font-size: 20px;
`

export const SearchIcon = styled(IoSearchOutline)`
	color: #FFFFFF;
	font-size: 20px;
`

export const PlusIcon = styled(MdOutlineAddPhotoAlternate)`
	color: #FFFFFF;
	font-size: 20px;
`

export const BookmarkIcon = styled(IoBookmark)`
	color: #FFFFFF;
	font-size: 20px;
`

export const SettingIcon = styled(IoSettingsSharp)`
	color: #FFFFFF;
	font-size: 20px;
`

export const ActionButton = styled.button`
	width: 100%;
	background: ${(props) => (props.active === "true" ? "linear-gradient(#007BFF, #0056B3)" : "#000000")};
	display: flex;
	flex-direction: row;
	align-items: center;
	outline: none;
	border: none;
	cursor: pointer;
	border-radius: 8px;
	padding: 8px;
	margin-bottom: 8px;
`

export const SidebarItemContainer = styled.li`
	display: flex;
	flex-direction: row;
	align-items: center;
`

export const Active = styled.div`
	background: linear-gradient(#007BFF, #0056B3);
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 8px;
	padding: 8px;
	margin-bottom: 8px;
`

export const SidebarItemText = styled.p`
	color: #FFFFFF;
	font-family: Jura;
	font-size: 20px;
	font-weight: 600;
	margin-left: 12px;
`

export const LogoutButton = styled.button`
	background: linear-gradient(#E63946, #B22222);
	height: 40px;
	width: 50%;
	color: #FFFFFF;
	font-family: Jura;
	font-size: 18px;
	font-weight: 600;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
`