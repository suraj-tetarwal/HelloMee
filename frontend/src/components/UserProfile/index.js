import { Component } from 'react'
import Cookies from 'js-cookie'
import { Oval } from 'react-loader-spinner'

import PostCard from '../PostCard'

import {
	MainProfileContainer,
	ProfileHeaderContainer,
	BackButton,
	BackIcon,
	LogoText,
	ProfileDetailsContainer,
	CoverImageContainer,
	CoverImage,
	ProfileImageContainer,
	ProfileImage,
	UserIcon,
	UserInfoContainer,
	FullName,
	Username,
	UserBio,
	Profession,
	SocialLink,
	LocationJoinContainer,
	LocationContainer,
	LocationIcon,
	LocationText,
	JoiningDateContainer,
	ClockIcon,
	JoiningDate,
	PostsContainer,
	NoPostContainer,
	NoPostText,
	LoaderContainer,
	FailureViewContainer,
	FailureViewText,
	RetryButton,
} from './styledComponents'

const apiStatusConstants = {
	success: 'SUCCESS',
	inProgress: 'IN_PROGRESS',
	failure: 'FAILURE',
}

class UserProfile extends Component {
	state = {
		profileData: {},
		apiStatus: apiStatusConstants.inProgress,
	}

	componentDidMount = () => {
		this.fetchUserProfileData()
	}

	fetchUserProfileData = async () => {
		const {match} = this.props
		const {userId} = match.params

		const jwtToken = Cookies.get('jwt_token')

		const url = `http://localhost:5000/profile/${userId}`
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${jwtToken}`,	
			}
		}

		const response = await fetch(url, options)
		
		if (response.ok) {
			const data = await response.json()
			this.setState({profileData: data, apiStatus: apiStatusConstants.success})	
		} else {
			this.setState({apiStatus: apiStatusConstants.failure})
		}
	}

	handleBackClick = () => {
		const {history} = this.props
		history.replace('/search')
	}

	renderLoader = () => {
		return (
			<LoaderContainer>
				<Oval
					color="#FFFFFF"
					secondaryColor="#CCCCCC"
					strokeWidth={5}
					height="50"
					width="50"
				/>
			</LoaderContainer>
		)
	}

	renderProfileHeader = () => {
		return (
			<ProfileHeaderContainer>
				<BackButton onClick={this.handleBackClick}>
					<BackIcon />
				</BackButton>
				<LogoText>Connecta</LogoText>
			</ProfileHeaderContainer>
		)
	}

	formatJoinDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})
	}

	renderProfileDetails = () => {
		const {profileData} = this.state
		const {accountCreated, profileUrl, firstName, lastName, username, bio, profession, socialUrl, location} = profileData
		const createdAt = this.formatJoinDate(accountCreated)
		return (
			<ProfileDetailsContainer>
				<CoverImageContainer>
					<CoverImage
						src="https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="cover image"
					/>
					<ProfileImageContainer>
						{
							profileUrl ? (
								<ProfileImage 
									src={profileUrl}
									alt="profile image"
								/>
							) : (
								<UserIcon />
							)
						}
					</ProfileImageContainer>
				</CoverImageContainer>
				<UserInfoContainer>
					<FullName>{firstName} {lastName}</FullName>
					<Username>{`@${username}`}</Username>
					<UserBio>{bio}</UserBio>
					{ profession ? <Profession>{profession}</Profession> : null }
					{ socialUrl ? <SocialLink href="#">{socialUrl}</SocialLink> : null }
					<LocationJoinContainer>
						<LocationContainer>
							<LocationIcon />
							<LocationText>{location}</LocationText>
						</LocationContainer>
						<JoiningDateContainer>
							<ClockIcon />
							<JoiningDate>{`Joined ${createdAt}`}</JoiningDate>
						</JoiningDateContainer>
					</LocationJoinContainer>
				</UserInfoContainer>
			</ProfileDetailsContainer>
		)
	}

	renderPostSection = () => {
		const {profileData} = this.state
		const {posts} = profileData

		if (posts.length === 0) {
			return (
				<NoPostContainer>
					<NoPostText>No posts yet.</NoPostText>
				</NoPostContainer>
			)
		}

		const modifiedPosts = posts.map(eachPost => ({
			...eachPost,
			username: profileData.username,
		}))		

		return (
			<PostsContainer>
				{
					modifiedPosts.map(eachPost => (
						<PostCard postDetails={eachPost} key={eachPost._id} />
					))
				}
			</PostsContainer>
		)
	}

	renderFailureView = () => {
		return (
			<FailureViewContainer>
				<FailureViewText>Something went wrong.</FailureViewText>
				<RetryButton type="button" onClick={this.fetchUserProfileData}>Retry</RetryButton>
			</FailureViewContainer>
		)
	}

	renderProfileContent = () => {
		const {apiStatus} = this.state
		switch(apiStatus) {
			case apiStatusConstants.inProgress:
				return this.renderLoader()
			case apiStatusConstants.success:
				return (
					<>
						{this.renderProfileHeader()}
						{this.renderProfileDetails()}
						{this.renderPostSection()}
					</>
				)
			case apiStatusConstants.failure:
				return this.renderFailureView()
			default: 
				return null
		}
	}

	render() {
		return (
			<MainProfileContainer>
				{this.renderProfileContent()}
			</MainProfileContainer>
		)
	}
}

export default UserProfile