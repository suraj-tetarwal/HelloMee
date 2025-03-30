import { IoArrowBack, IoSend } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const MainContainer = styled.div`
	background-color: #000000;
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: auto;

	@media screen and (min-width: 768px) {
		width: 40%;
		flex-grow: 1;
		border-left: 1px solid #808080;
	}
`

export const HeaderContainer = styled.div`
	position: sticky;
	top: 0;
	left: 0;
	background-color: rgba(10, 10, 10, 0.5);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 12px;
	border-bottom: 1px solid #BDBDBD;
	backdrop-filter: blur(10px);
	z-index: 1;

	@media screen and (min-width: 768px) {
		display: none;
	}
`

export const ActionButton = styled.button`
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

export const BackIcon = styled(IoArrowBack)`
	color: #FFFFFF;
	font-size: 24px;
`

export const Logo = styled(Link)`
	color: #FFFFFF;
	font-family: Montez;
	font-size: 28px;
	font-weight: 500;
	text-decoration: none;
`

export const ContentContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`

export const MessageContainer = styled.div`
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
`

export const MessagesList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style-type: none;
	padding: 12px;
	overflow-y: auto;
`

export const PlaceholderText = styled.p`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #BDBDBD;
	font-family: Jura;
	font-size: 20px;
	font-weight: 600;
	text-align: center;
`

export const FormContainer = styled.form`
	position: sticky;
	bottom: 0;
	width: 100%;
	background-color: #1A1A1A;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`

export const MessageBox = styled.textarea`
	background-color: transparent;
	height: 100px;
	color: #BDBDBD;
	font-family: Roboto;
	font-size: 18px;
	font-weight: 500;
	border: none;
	outline: none;
	flex-grow: 1;
	padding: 8px;
`

export const SendMessageIcon = styled(IoSend)`
	color: #FFFFFF;
	font-size: 24px;
	margin-left: 4px;
	margin-right: 4px;
`