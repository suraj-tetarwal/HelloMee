import {
	ChatMessageItem,
	MessageText,
} from './styledComponents'

const MessageItem = (props) => {
	const {messageInfo} = props
	const {text, sender} = messageInfo
	return (
		<ChatMessageItem by={sender}>
			<MessageText>{text}</MessageText>
		</ChatMessageItem>
	)
}

export default MessageItem