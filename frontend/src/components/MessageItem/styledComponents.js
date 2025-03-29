import styled from 'styled-components'

export const ChatMessageItem = styled.li`
	background: ${(props) => (props.by === "USER" ? "linear-gradient(#007BFF, #0056B3)" : "linear-gradient(#00C853, #009624)")};
	max-width: 80%;
	border-radius: ${(props) => (props.by === "USER" ? "16px 4px 16px 16px" : "4px 16px 16px 16px")};
	align-self: ${(props) => (props.by === "USER" ? "flex-end" : "flex-start")};
	padding: 12px;
	margin-bottom: 12px;
`

export const MessageText = styled.p`
	color: #FFFFFF;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
`