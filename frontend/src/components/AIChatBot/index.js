import { Component } from 'react'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'

import MessageItem from '../MessageItem'

import {
	MainContainer,
	HeaderContainer,
	ActionButton,
	BackIcon,
	Logo,
	ContentContainer,
	MessageContainer,
	PlaceholderText,
	FormContainer,
	MessageBox,
	SendMessageIcon,
} from './styledComponents'

class AIChatBot extends Component {
	state = {
		messages: [],
		userInput: "",
	}

	handleUserInput = (event) => {
		this.setState({userInput: event.target.value})
	}

	handleSendMessage = async (event) => {
		event.preventDefault()
	
		const {messages, userInput} = this.state

		const trimmedText = userInput.trim()

		if (trimmedText === "") {
			console.log("Nothing is there in input box")
			return
		}

		const userMessage = {
			id: uuidv4(),
			text: trimmedText,
			sender: "USER",
		}

		const loaderMessage = {
			id: uuidv4(),
			text: "Thinking...",
			sender: "AI",
		}

		this.setState((prevState) => ({
			messages: [...prevState.messages, userMessage, loaderMessage],
			userInput: "",
		}))
		
		const jwtToken = Cookies.get('jwt_token')
	
		const url = "http://localhost:5000/chatbot"
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({message: userInput}),
		}

		const response = await fetch(url, options)

		const data = await response.json()
		if (response.ok) {
			const {reply} = data
			this.setState((prevState) => ({
				messages: prevState.messages.map((msg) => 
					msg.text === "Thinking..." ? {id: uuidv4, text: reply, sender: "AI"} : msg
				)
			}))
		}	
		
	}

	renderMessages = () => {
		const {messages} = this.state
		console.log(messages)
		return (
			<MessageContainer>
				{
					messages.length === 0 ? (
						<PlaceholderText>Hey there! How can I assist you today?</PlaceholderText>
					) : null
				}
			</MessageContainer>
		)
	}
	

	render() {
		const {userInput} = this.state
		return (
			<MainContainer>
				<HeaderContainer>
					<ActionButton type="button">
						<BackIcon />
					</ActionButton>
					<ActionButton type="button">
						<Logo to="/">Connecta</Logo>
					</ActionButton>
				</HeaderContainer>
				<ContentContainer>
					{this.renderMessages()}
					<FormContainer onSubmit={this.handleSendMessage}>
						<MessageBox 
							placeholder="Start a conversation..." 
							rows="2"
							value={userInput}
							onChange={this.handleUserInput}
						>
						</MessageBox>
						<ActionButton type="submit">
							<SendMessageIcon />
						</ActionButton>
					</FormContainer>
				</ContentContainer>
			</MainContainer>
		)
	}
}

export default AIChatBot