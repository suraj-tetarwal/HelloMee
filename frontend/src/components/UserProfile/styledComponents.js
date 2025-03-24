import { IoArrowBack, IoLocationOutline } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa'
import { GoClock } from 'react-icons/go'
import styled from 'styled-components'

export const MainProfileContainer = styled.div`
	background-color: #000000;
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: auto;
`

export const ProfileHeaderContainer = styled.div`
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

export const BackButton = styled.button`
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

export const BackIcon = styled(IoArrowBack)`
	color: #FFFFFF;
	font-size: 24px;
`

export const HomeButton = styled.button`
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

export const LogoText = styled.p`
	color: #FFFFFF;
	font-family: Montez;
	font-size: 28px;
	font-weight: 500;
`

export const ProfileDetailsContainer = styled.div`
	position: relative;
	border-bottom: 3px solid #808080;
`

export const CoverImageContainer = styled.div`
	position: relative;
	height: 150px;
	width: 100%;
`

export const CoverImage = styled.img`
	width: 100%;
	height: 100%;
`

export const ProfileImageContainer = styled.div`
	position: absolute;
	background-color: #FF123F;
	height: 60px;
	width: 60px;
	bottom: -30px;
	left: 30px;
	border-radius: 50%;
	border: 4px solid #000000;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
`

export const ProfileImage = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 50%;
	margin: 0;
	object-fit: cover;
`

export const UserIcon = styled(FaUser)`
	color: #FFFFFF;
	font-size: 28px;
`

export const UserInfoContainer = styled.div`
	padding: 8px;
	margin-top: 30px;
`

export const UserInfoTopSection = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const UserNameSection = styled.div`
	display: flex;
	flex-direction: column;
`

export const FullName = styled.h1`
	color: #FFFFFF;
	font-family: Jura;
	font-size: 24px;
	font-weight: 900;
	margin-bottom: 0;
`

export const Username = styled.p`
	color: #1DA1F2;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
	margin-top: 0;
`

export const EditProfileButton = styled.button`
	height: 40px;
	background-color: transparent;
	color: #FFFFFF;
	font-family: Jura;
	font-size: 14px;
	font-weight: 600;
	border: 1px solid #FFFFFF;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	padding-left: 16px;
	padding-right: 16px;
	margin-right: 8px;
`

export const FollowUnfollowButton = styled.button`
	height: 40px;
	background-color: ${(props) => (props.follow ? '#808080' : '#1D9Bf0')};
	color: #FFFFFF;
	font-family: Jura;
	font-size: 14px;
	font-weight: 600;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	padding-left: 16px;
	padding-right: 16px;
	margin-right: 8px;
`

export const UserBio = styled.p`
	color: #FFFFFF;
	font-family: Jura;
	font-size: 20px;
	font-weight: 500;
	margin-top: 12px;
`

export const Profession = styled.p`
	color: #808080;
	font-family: Jura;
	font-size: 18px;
	font-weight: 600;
	margin-top: 12px;
	margin-bottom: 4px;
`

export const SocialLink = styled.a`
	color: #00FFFF;
	font-family: Jura;
	font-size: 16px;
	font-weight: 500;
	text-decoration: none;
	cursor: pointer;
`

export const LocationJoinContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 12px;
	margin-bottom: 8px;
`

export const LocationContainer = styled.div`
	display: flex;
	align-items: center;
	margin-right: 16px;
`

export const LocationIcon = styled(IoLocationOutline)`
	color: #808080;
	font-size: 18px;
	margin-right: 4px;
`

export const LocationText = styled.p`
	color: #808080;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
`

export const JoiningDateContainer = styled.div`
	display: flex;
	align-items: center;
`

export const ClockIcon = styled(GoClock)`
	color: #808080;
	font-size: 18px;
	margin-right: 4px;
`

export const JoiningDate = styled.p`
	color: #808080;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
`

export const PostsContainer = styled.ul`
	list-style-type: none;
	display: flex;
	flex-direction: column;
`

export const NoPostContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
`

export const NoPostText = styled.p`
	color: #BDBDBD;
	font-family: Jura;
	font-size: 20px;
	font-weight: 500;
	text-align: center;
`

export const LoaderContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const FailureViewContainer = styled.div`
	border: 2px solid red;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const FailureViewText = styled.p`
	color: #D32F2F;
	font-family: Jura;
	font-size: 24px;
	font-weight: 600;
	margin-bottom: 16px;
`

export const RetryButton = styled.button`
	height: 40px;
	background-color: transparent;
	color: #D32F2F;
	font-family: Jura;
	font-size: 16px;
	font-weight: 500;
	border: 2px solid #D32F2F;
	border-radius: 4px;
	cursor: pointer;
	outline: none;
	padding-left: 16px;
	padding-right: 16px;
`
