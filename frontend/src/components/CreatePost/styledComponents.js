import { FaRegSquarePlus, FaCropSimple } from 'react-icons/fa6'
import { GoTrash } from 'react-icons/go'
import styled from 'styled-components'

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;

	@media screen and (min-width: 768px) {
		flex-direction: row;
	}
`

export const CreatePostContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	padding: 16px;

	@media screen and (min-width: 768px) {
		padding: 32px;
	}
`

export const CreatePostHeading = styled.div`
	color: #FFFFFF;
	font-family: Jura;
	font-size: 28px;
	font-weight: 900;
	text-align: center;
`

export const MediaActionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 24px;
	margin-bottom: 24px;
`

export const FileInputContainer = styled.div`
	display: flex;
	flex-direction: row;
`

export const FileInput = styled.input`
	display: none;
`

export const Label = styled.label`
	cursor: pointer;
`

export const AddMediaButton = styled.button`
	background: linear-gradient(#007BFF, #0056B3);
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.5);
	padding: 8px;
	margin-right: 24px;
`

export const PlusIcon = styled(FaRegSquarePlus)`
	color: #FFFFFF;
	font-size: 24px;
`

export const CropMediaButton = styled.button`
	background: linear-gradient(#00C853, #009624);
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	box-shadow: 0px 2px 10px rgba(0, 255, 100, 0.5);
	padding: 8px;
	margin-right: 24px;
`

export const CropIcon = styled(FaCropSimple)`
	color: #FFFFFF;
	font-size: 24px;
`

export const DeleteMediaButton = styled.button`
	background: linear-gradient(#E63946, #B22222);
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	box-shadow: 0px 0px 10px rgba(230, 57, 70, 0.5);
	padding: 8px;
`

export const TrashIcon = styled(GoTrash)`
	color: #FFFFFF;
	font-size: 24px;
`

export const MediaContainer = styled.div`
	background-color: #1A1A1A;
	border: 2px dashed #808080;
	height: auto;
	max-height: 50vh;
	min-height: 300px;
	aspect-ratio: 16/9;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 24px;	
`

export const CroppingContainer = styled.div`
	background-color: #1A1A1A;
	border: 2px dashed #808080;
	height: auto;
	max-height: 50vh;
	min-height: 300px;
	aspect-ratio: 16/9;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 24px;
`

export const MediaPreviewContainer = styled.div`
	background-color: #1A1A1A;
	border: 2px dashed #808080;
	height: auto;
	max-height: 50vh;
	min-height: 300px;
	aspect-ratio: 16/9;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 24px;
`

export const Media = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`

export const PlaceholderText = styled.p`
	color: #808080;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
	text-align: center;
`

export const TextInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 24px;
`

export const TextInputContainerHeading = styled.h1`
	color: #FFFFFF;
	font-family: Jura;
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 16px;
`

export const TextArea = styled.textarea`
	border: 2px solid blue;
	min-height: 200px;
	max-height: 200px;
	width: 100%;
	background-color: #1A1A1A;
	color: #FFFFFF;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
	border: 1px solid #808080;
	border-radius: 4px;
	outline: none;
	padding: 12px;
`

export const CharacterCounter = styled.p`
	color: #BDBDBD;
	font-family: Jura;
	font-size: 14px;
	font-weight: 500;
	margin-top: 8px;
`

export const PostActionButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const ResetButton = styled.button`
	height: 40px;
	background-color: #808080;
	color: #FFFFFF;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	box-shadow: 0px 4px 8px rgba(123, 123, 123, 0.4);
	padding-left: 16px;
	padding-right: 16px;
`

export const PostButton = styled.button`
	height: 40px;
	background: linear-gradient(#007BFF, #0056B3);
	color: #FFFFFF;
	font-family: Jura;
	font-size: 18px;
	font-weight: 500;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.5);
	padding-left: 16px;
	padding-right: 16px;
`


