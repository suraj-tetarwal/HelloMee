import React, { Component } from 'react'
import Cropper from 'react-cropper'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import Header from '../Header'
import BottomNavbar from '../BottomNavbar'
import LeftSidebar from '../LeftSidebar'
import AIChatBot from '../AIChatBot'

import 'cropperjs/dist/cropper.css'

import {
	MainContainer,
	CreatePostContainer,
	CreatePostHeading,
	MediaActionsContainer,
	FileInputContainer,
	FileInput,
	Label,
	AddMediaButton,
	PlusIcon,
	CropMediaButton,
	CropIcon,
	DeleteMediaButton,
	TrashIcon,
	MediaContainer,
	Media,
	PlaceholderText,
	TextInputContainer,
	TextInputContainerHeading,
	TextArea,
	CharacterCounter,
	PostActionButtonContainer,
	ResetButton,
	PostButton,
} from './styledComponents'

class CreatePost extends Component {
	state = {
		selectedMediaUrl: null,
		croppedMediaUrl: null,
		captionText: "",
	}

	cropperRef = React.createRef()

	handleFileSelect = event => {
		const file = event.target.files[0]

		if (!file) return

		if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
			alert("Invalid file type! Please select an image or video.")
			return
		}

		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			this.setState({selectedMediaUrl: reader.result})
		}
	}

	onHandleCrop = () => {
		if (this.cropperRef.current) {
			const croppedCanvas = this.cropperRef.current.cropper.getCroppedCanvas({
				height: 500,
				width: 500,
				imageSmoothingEnabled: true,
			})
			if (croppedCanvas) {
				croppedCanvas.toBlob((blob) => {
					const blobUrl = URL.createObjectURL(blob)
					this.setState({selectedMediaUrl: blobUrl, croppedMediaUrl: blob})
				}, 'image/png', 1.0)
			}
		}
	}

	onHandleDelete = () => {
		this.setState({selectedMediaUrl: null, croppedMediaUrl: null})
	}

	handleCaptionChange = (event) => {
		const captionText = event.target.value
		if (captionText.length <= 120) {
			this.setState({captionText})
		}
	}

	handleReset = () => {
		this.setState({
			selectedMediaUrl: null,
			croppedMediaUrl: null,
			captionText: "",
		})
	}

	uploadToCloudinary = async (croppedMediaUrl) => {
		const formData = new FormData()
		formData.append("file", croppedMediaUrl)
		formData.append("upload_preset", "profile_picture_upload")

		const url = "https://api.cloudinary.com/v1_1/dhrb2b9mr/image/upload"
		const options = {
			method: "POST",
			body: formData,
		}

		const response = await fetch(url, options)
		if (response.ok) {
			const data = await response.json()
			const {secure_url} = data
			return secure_url
		} else {
			return null
		}
	}

	handlePost = async () => {
		const loadingToast = toast.loading("Getting your post ready...")

		const {selectedMediaUrl, croppedMediaUrl, captionText} = this.state

		if (!selectedMediaUrl && !croppedMediaUrl && !captionText) {
			toast.update(loadingToast, {
				render: "Your post is empty! Add caption or media",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			})
			return
		}

		if (selectedMediaUrl && !croppedMediaUrl) {
			toast.update(loadingToast, {
				render: "Please crop the image before posting",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			})
			return
		}

		let mediaUrl = null
		if (croppedMediaUrl) {
			mediaUrl = await this.uploadToCloudinary(croppedMediaUrl)
			if (!mediaUrl) {
				toast.dismiss()
				toast.error("Image upload failed. Try again.")
				return
			}
		}

		const jwtToken = Cookies.get('jwt_token')

		const postData = {
			caption: captionText || "",
			mediaUrl: mediaUrl || null,
		}

		const url = "http://localhost:5000/posts/new/"
		const options = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwtToken}`
			},
			body: JSON.stringify(postData)
		}

		const response = await fetch(url, options)
		if (response.ok) {
			const data = await response.json()
			const {message} = data
			toast.update(loadingToast, {
				render: message,
				type: "success",
				isLoading: false,
				autoClose: 3000,
			})
			this.handleReset()
		} else {
			toast.update(loadingToast, {
				render: "Post creation failed. Try again.",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			})
		}
	}
	
	render() {
		const { selectedMediaUrl, croppedMediaUrl, captionText } = this.state
		return (
			<MainContainer>
				<Header />
				<LeftSidebar />
				<CreatePostContainer>
					<CreatePostHeading>Create Post</CreatePostHeading>
					<MediaActionsContainer>
						{
							selectedMediaUrl === null && croppedMediaUrl === null && (
								<FileInputContainer>
									<AddMediaButton type="button">
										<Label htmlFor="fileInput">		
											<PlusIcon />
										</Label>
									</AddMediaButton>
									<FileInput 
										type="file"
										id="fileInput"
										accept="image/*, video/*"
										onChange={this.handleFileSelect}
									/>
								</FileInputContainer>
							)
						}
						{
							selectedMediaUrl && croppedMediaUrl === null && (
								<CropMediaButton type="button" onClick={this.onHandleCrop}>
									<CropIcon />
								</CropMediaButton>
							)
						}
						<DeleteMediaButton type="button" onClick={this.onHandleDelete}>
							<TrashIcon />
						</DeleteMediaButton>
					</MediaActionsContainer>
					<MediaContainer>
						{ selectedMediaUrl === null && croppedMediaUrl === null && <PlaceholderText>Select an image to crop before posting.</PlaceholderText> }
						{ 
							selectedMediaUrl !== null && croppedMediaUrl === null && (
								<Cropper
									ref={this.cropperRef}
									src={selectedMediaUrl}
									style={{height: "100%", width:"100%"}}
									aspectRatio={1}
									viewMode={1}
									guides={false}
									background={false}
									responsive={true}
									autoCropArea={1}
									dragMode="move"
									checkOrientation={false}
									scalable={false}
									zoomable={false}
								/>
							)
						}
						{
							croppedMediaUrl !== null && (
								<Media
									src={selectedMediaUrl}
									alt="preview image"
								/>
							)
						}
					</MediaContainer>
					<TextInputContainer>
						<TextInputContainerHeading>
							Write a Caption
						</TextInputContainerHeading>
						<TextArea placeholder="Write something interesting..." value={captionText} onChange={this.handleCaptionChange}></TextArea>
						<CharacterCounter>{captionText.length}/120</CharacterCounter>
					</TextInputContainer>
					<PostActionButtonContainer>
						<ResetButton type="button" onClick={this.handleReset}>Reset</ResetButton>
						<PostButton type="button" onClick={this.handlePost}>Post</PostButton>
					</PostActionButtonContainer>
				</CreatePostContainer>
				<BottomNavbar />
				<AIChatBot />
			</MainContainer>
		)
	}
}

export default CreatePost