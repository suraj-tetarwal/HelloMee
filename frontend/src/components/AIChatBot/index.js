import { Component } from 'react'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

import MessageItem from '../MessageItem'

import {
	MainContainer,
	HeaderContainer,
	ActionButton,
	BackIcon,
	Logo,
	ContentContainer,
	MessageContainer,
	MessagesList,
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
	
		const {userInput} = this.state

		const trimmedText = userInput.trim()

		if (trimmedText === "") {
			toast.error("Silence is golden, but I can't reply to nothing! Say something!")
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
					msg.text === "Thinking..." ? {id: uuidv4(), text: reply, sender: "AI"} : msg
				)
			}))
		} else {
			const {error} = data
			toast.error(error)
		}	
	}

	renderMessages = () => {
		const {messages} = this.state
		return (
			<MessageContainer>
				{
					messages.length === 0 ? (
						<PlaceholderText>Hey there! How can I assist you today?</PlaceholderText>
					) : (
						<MessagesList>
							{
								messages.map((eachMessage) => (
									<MessageItem key={eachMessage.id} messageInfo={eachMessage} />
								))
							}
						</MessagesList>
					)
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