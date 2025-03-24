import { Component } from 'react'
import Cookies from 'js-cookie'
import { Oval } from 'react-loader-spinner'
import {toast} from 'react-toastify'

import "react-toastify/dist/ReactToastify.css"

import {
	MainContainer,
	HeaderContainer,
	ActionButton,
	BackIcon,
	Logo,
	EditProfileContainer,
	Heading,
	FormContainer,
	FieldContainer,
	LabelText,
	InputBox,
	TextArea,
	ButtonContainer,
	CancelButton,
	SaveButton,
	LoaderContainer,
	FailureViewContainer,
	ErrorMessage,
	RetryButton,
} from './styledComponents'

const apiStatusConstants = {
	initial: 'INITIAL',
	success: 'SUCCESS',
	failure: 'FAILURE',
	inProgress: 'IN_PROGRESS'
}

class EditProfile extends Component {
	state = {
		profileData: {},
		originalProfileData: {},
		apiStatus: apiStatusConstants.initial,
	}

	componentDidMount() {
		this.fetchProfileData()
	}

	fetchProfileData = async () => {
		this.setState({apiStatus: apiStatusConstants.inProgress})

		const jwtToken = Cookies.get('jwt_token')

		const url = "http://localhost:5000/profile"
		const options = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			}
		}
		const response = await fetch(url, options)
		if (response.ok) {
			const data = await response.json()
			const {profile} = data
			this.setState({profileData: profile, originalProfileData: profile, apiStatus: apiStatusConstants.success})
		} else {
			this.setState({apiStatus: apiStatusConstants.failure})
		}
	}

	handleBackClick = () => {
		window.history.back()
	}

	renderLoader = () => {
		return (
			<LoaderContainer>
				<Oval color="#FFFFFF" secondaryColor="#000000" strokeWidth={5} height="50" width="50" />
			</LoaderContainer>
		)
	}

	handleChange = (event) => {
		this.setState((prevState) => ({profileData: {...prevState.profileData, [event.target.name]: event.target.value}}))
	}

	submitProfileUpdate = async (event) => {
		event.preventDefault()

		const toastId = toast.loading("Updating Profile...")

		const {profileData, originalProfileData} = this.state
		const updatedFields = {}

		for (const key in profileData) {
			if (profileData[key] !== originalProfileData[key]) {
				updatedFields[key] = profileData[key]
			}			
		}

		if (Object.keys(updatedFields).length === 0) {
			toast.update(toastId, {
				render: "No Changes detected",
				type: "info",
				isLoading: false,
				autoClose: 3000,
			})
			return 
		}

		const jwtToken = Cookies.get('jwt_token')

		const url = "http://localhost:5000/profile/update"
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({updatedFields})
		}
		const response = await fetch(url, options)
		const data = await response.json()
		const {message} = data
		if (response.ok) {
			toast.update(toastId, {
				render: message,
				type: "success",
				isLoading: false,
				autoClose: 3000,
			})
			this.handleBackClick()
		} else {
			toast.update(toastId, {
				render: message,
				type: "error",
				isLoading: false,
				autoClose: 3000,
			})
		}
	}

	renderSuccessView = () => {
		const {profileData} = this.state
		const {firstName, lastName, bio, profession, socialLink, location} = profileData
		return (
			<EditProfileContainer>
				<Heading>Edit Profile</Heading>
				<FormContainer onSubmit={this.submitProfileUpdate}>
					<FieldContainer>
						<LabelText>First Name</LabelText>
						<InputBox
							type="text"
							name="firstName"
							value={firstName}
							onChange={this.handleChange}
						/>
					</FieldContainer>
					<FieldContainer>
						<LabelText>Last Name</LabelText>
						<InputBox
							type="text"
							name="lastName"
							value={lastName}
							onChange={this.handleChange}
						/>
					</FieldContainer>
					<FieldContainer>
						<LabelText>Bio</LabelText>
						<TextArea name="bio" value={bio} onChange={this.handleChange}></TextArea>
					</FieldContainer>
					<FieldContainer>
						<LabelText>Profession</LabelText>
						<InputBox
							type="text"
							name="profession"
							value={profession}
							onChange={this.handleChange}
						/>
					</FieldContainer>
					<FieldContainer>
						<LabelText>Social</LabelText>
						<InputBox
							type="text"
							name="socialLink"
							value={socialLink}
							onChange={this.handleChange}
						/>
					</FieldContainer>
					<FieldContainer>
						<LabelText>Location</LabelText>
						<InputBox
							type="text"
							name="location"
							value={location}
							onChange={this.handleChange}
						/>
					</FieldContainer>
					<ButtonContainer>
						<CancelButton type="button" onClick={this.handleBackClick}>Cancel</CancelButton>
						<SaveButton type="submit">Save</SaveButton>
					</ButtonContainer>
				</FormContainer>
			</EditProfileContainer>
		)
	}

	renderFailureView = () => {
		return (
			<FailureViewContainer>
				<ErrorMessage>Something went wrong. Try again.</ErrorMessage>
				<RetryButton type="button" onClick={() => this.fetchProfileData()}>Retry</RetryButton>
			</FailureViewContainer>
		)
	}

	renderContent = () => {
		const {apiStatus} = this.state

		switch(apiStatus) {
			case apiStatusConstants.success:
				return this.renderSuccessView()
			case apiStatusConstants.failure:
				return this.renderFailureView()
			case apiStatusConstants.inProgress:
				return this.renderLoader()
			default:
				return this.renderLoader()
		}
	}

	render() {
		return (
			<MainContainer>
				<HeaderContainer>
						<ActionButton onClick={this.handleBackClick}>
							<BackIcon />
						</ActionButton>
						<ActionButton>
							<Logo to="/">Connecta</Logo>
						</ActionButton>
				</HeaderContainer>
				{this.renderContent()}
			</MainContainer>
		)
	}
}

export default EditProfile