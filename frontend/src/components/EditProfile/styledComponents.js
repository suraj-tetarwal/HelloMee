import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const MainContainer = styled.div`
	background-color: #000000;
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: auto;
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

export const EditProfileContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 16px;
`

export const Heading = styled.h1`
	color: #FFFFFF;
	font-family: Jura;
	font-size: 32px;
	font-weight: 900;
	text-align: center;
	margin-bottom: 24px;
`

export const FormContainer = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
`

export const FieldContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;
`

export const LabelText = styled.label`
	color: #BDBDBD;
	font-family: Jura;
	font-size: 20px;
	font-weight: 700;
	margin-bottom: 8px;
`

export const InputBox = styled.input`
	background-color: #1A1A1A;
	height: 40px;
	width: 100%;
	color: #FFFFFF;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
	border: 1px solid #808080;
	border-radius: 8px;
	outline: none;
	padding: 8px;
`

export const TextArea = styled.textarea`
	background-color: #1A1A1A;
	min-height: 200px;
	color: #FFFFFF;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
	border: 1px solid #808080;
	border-radius: 8px;
	outline: none;
	padding: 8px;
`

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction:	row;
	justify-content: space-between;
	align-items: center;
	margin-top: 16px;
	margin-bottom: 32px;
`

export const CancelButton = styled.button`
	background-color: #808080;
	height: 40px;
	color: #FFFFFF;
	font-family: Jura;
	font-size: 16px;
	font-weight: 500;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	box-shadow: 0px 0px 8px rgba(123, 123, 123, 0.4);
	padding-left: 16px;
	padding-right: 16px; 
`

export const SaveButton = styled.button`
	background: linear-gradient(#007BFF, #0056B3);
	height: 40px;
	color: #FFFFFF;
	font-family: Jura;
	font-size: 16px;
	font-weight: 500;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.5);
	padding-left: 16px;
	padding-right: 16px;
`

export const LoaderContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const FailureViewContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	
`

export const ErrorMessage = styled.p`
	color: #808080;
	font-family: Jura;
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 16px;
`

export const RetryButton = styled.button`
	background-color: #1A1A1A;
	height: 40px;
	color: #FFFFFF;
	font-family: Jura;
	font-size: 16px;
	font-weight: 500;
	border: 1px solid #808080;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	padding-left: 16px;
	padding-right: 16px;
`
