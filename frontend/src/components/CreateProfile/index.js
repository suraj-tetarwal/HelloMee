import React, {Component} from 'react'
import Cropper from 'react-cropper'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import { toast } from 'react-toastify'
import { Oval } from 'react-loader-spinner'

// import icons from react-icons
import { FaUserCircle, FaUser, FaLink, FaBriefcase } from "react-icons/fa"
import { IoRefresh, IoCrop, IoClose } from 'react-icons/io5'
import { MdLocationPin } from 'react-icons/md'
import { BiSolidTag } from 'react-icons/bi'

import 'reactjs-popup/dist/index.css'
import 'cropperjs/dist/cropper.css'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'

import {
    MainContainer,
    CardContainer,
    CreateProfileHeading,
    FormContainer,
    ProfileImageContainer,
    ImageContainer,
    LoaderContainer,
    ProfileImage,
    UploadImageButton,
    PopupContainer,
    ContentContainer,
    CloseButton,
    SelectImageContainer,
    SelectImageButton,
    LabelText,
    FileInputElement,
    PreviewSection,
    Placeholder,
    PreviewImage,
    CropperSection,
    ButtonContainer,
    ActionButtonContainer,
    CropButton,
    CropIcon,
    DoneButton,
    ResetButton,
    ResetIcon,
    ProfileDetailContainer,
    DetailGroup,
    DetailGroupHeading,
    InfoText,
    Label,
    Value,
    InputField,
    UserIcon,
    BriefCaseIcon,
    LinkIcon,
    LocationIcon,
    BioContainer,
    BioTextarea,
    BioCharCount,
    ProfileActionButtonContainer,
    SkipButton,
    SaveButton,
} from './styledComponents'

const uploadStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

class CreateProfile extends Component {
    state = {
        profileImage: null,
        previewImage: null,
        croppedImage: null,
        publicId: null,
        uploadStatus: uploadStatusConstants.initial,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        bio: '',
        profession: '',
        socialLink: '',
        location: '',
    }

    componentDidMount = () => {
        this.fetchUserData();
    }

    fetchUserData = async () => {
        try {
            const jwtToken = Cookies.get("jwt_token")

            const url = "http://localhost:5000/user/details"
            const options = {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                },
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                const {username, email} = data
                this.setState({username, email})
            } else {
                const {message} = data
                toast.error(message)
                this.setState({
                    username: 'your_username',
                    email: 'youremail@gmail.com'
                })
            }    
        } catch (e) {
            toast.error("Something went wrong!!!")
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSave = async (event) => {
        event.preventDefault()

        const jwtToken = Cookies.get('jwt_token')

        const {profileImage, firstName, lastName, bio, profession, socialLink, location} = this.state
        const userProfileData = {
            profileImage,
            firstName,
            lastName,
            bio,
            profession,
            socialLink,
            location,
        }

        const url = "http://localhost:5000/profile/"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(userProfileData)
        }

        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            const {history} = this.props
            const {message} = data
            toast.success(message)
            history.replace('/')
        } else {
            const {message} = data
            toast.error(message)
        }
    }

    handleSkipProfile = () => {
        const {history} = this.props
        history.replace('/')
    }

    cropperRef = React.createRef()

    handleSelectImage = event => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
	    reader.readAsDataURL(file)
            reader.onload = () => {
                this.setState({previewImage: reader.result})
            }
        }
    }

    // Getting signature and API_KEY from backend
    generateSignature = async (publicId) => {
        try {
            const timestamp = Math.floor(Date.now() / 1000)
            const signatureResponse = await fetch("http://localhost:5000/generate-signature", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({public_id: publicId, timestamp})
            })
            
            const signatureData = await signatureResponse.json()
            if (signatureResponse.ok) {
                const {signature, api_key} = signatureData
                return {
                    signature,
                    apiKey: api_key,
                    timestamp,
                }
            }
            else {
                toast.error(signatureData.error || "Something went wrong.")
            }
        } catch (error) {
            toast.error("Network error. Please try again.")
        }
    }

    deleteUploadedImage = async () => {
        const {publicId} = this.state
        if (publicId) {
            try {
                const {signature, apiKey, timestamp} = await this.generateSignature(publicId)

                const url = "https://api.cloudinary.com/v1_1/dhrb2b9mr/image/destroy"
                const requestBody = {
                    public_id: publicId,
                    api_key: apiKey,
                    timestamp,
                    signature,
                }
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                }

                const response = await fetch(url, options)
                console.log(response)
                if (response.ok) {
                    toast.success("Previous image deleted")
                    this.setState({publicId: null})
                } else {
                    toast.error("Something went wrong")
                }    
            } catch(error) {
                toast.error("Something went wrong.")
            }
        }
    }

    uploadToCloudinary = async (croppedImage) => {
        try {
            const {publicId} = this.state

            if (publicId) {
                this.deleteUploadedImage()
            }

            this.setState({
                uploadStatus: uploadStatusConstants.inProgress,
            })

            // Creating FormData object to send the Blob
            const formData = new FormData()
            formData.append("file", croppedImage)
            formData.append("upload_preset", "profile_picture_upload")

            const url = "https://api.cloudinary.com/v1_1/dhrb2b9mr/image/upload"
            const options = {
                method: "POST",
                body: formData,
            }
            const response = await fetch(url, options)
            
            if (response.ok) {
                const data = await response.json()
                const {secure_url, public_id} = data
                this.setState({
                    profileImage: secure_url,
                    publicId: public_id,
                    previewImage: null,
                    croppedImage: null,
                    uploadStatus: uploadStatusConstants.success,
                })
            } else {
                this.setState({
                    uploadStatus: uploadStatusConstants.failure,
                })
                toast.error("Something went wrong.")
            }
        } catch(error) {
            toast.error("Something went wrong.")
        }
    }

    handleDone = async (close) => {
        const {croppedImage, previewImage} = this.state 
        if (croppedImage) {
            this.uploadToCloudinary(croppedImage)
            close()
        }
        else if (!croppedImage && previewImage) {
            toast.warning("Oops! You need to crop your image before proceeding.")
        }
        else {
            toast.warning("No image is selected")
        }
    }

    handleReset = () => {
        this.setState({previewImage: null, croppedImage: null})
    }

    handleCrop = () => {
        if (this.cropperRef.current) {
            const croppedCanvas = this.cropperRef.current.cropper.getCroppedCanvas({
                width: 500,
                height: 500,
                imageSmoothingEnabled: true,
            })
            if (croppedCanvas) {
                croppedCanvas.toBlob((blob) => {
                    this.setState({previewImage: URL.createObjectURL(blob), croppedImage: blob})
                }, 'image/png', 1.0)
            }
        }
    }

    renderLoader = () => {
        return (
            <LoaderContainer>
                <Oval color="#FFFFFF" secondaryColor="#CCCCCC" strokeWidth={5} height="25" width="25" />
            </LoaderContainer>
        )
    }

    renderProfileImage = () => {
        const {profileImage} = this.state
        return <ProfileImage src={profileImage} alt="profile image" />
    }

    renderPlaceholderIcon = () => {
        return <FaUserCircle color="#FFFFFF" size="100px" />
    }

    renderProfileSection = () => {
        const {uploadStatus} = this.state
        switch (uploadStatus) {
            case uploadStatusConstants.inProgress:
                return this.renderLoader()
            case uploadStatusConstants.success:
                return this.renderProfileImage()
            case uploadStatusConstants.failure:
                return this.renderPlaceholderIcon()
            default:
                return this.renderPlaceholderIcon()
        }
    }

    togglePassword = () => {
        this.setState(prevState => ({showPassword: !prevState.showPassword}))
    }

    render() {
        const {previewImage, username, email} = this.state
        return (
            <MainContainer>
                <CardContainer>
                    <CreateProfileHeading>Set Up Your Profile</CreateProfileHeading>
                    <FormContainer>
                        <ProfileImageContainer>
                            <ImageContainer>
                                {this.renderProfileSection()}
                            </ImageContainer>
                            <Popup 
                                trigger={<UploadImageButton type="button">Upload Image</UploadImageButton>} 
                                modal
                            >
                                {(close) => (
                                    <PopupContainer>
                                        <ContentContainer>
                                            <CloseButton onClick={close}>
                                                <IoClose />
                                            </CloseButton>
                                            <SelectImageContainer>
                                               <SelectImageButton type="button" >
                                                    <LabelText htmlFor="imageInput">Select Image</LabelText>
                                               </SelectImageButton>
                                               <FileInputElement type="file" id="imageInput" onChange={this.handleSelectImage} />
                                               <PreviewSection>
                                                    {
                                                        previewImage ? 
                                                        <PreviewImage src={previewImage} alt="preview-image" /> :
                                                        <Placeholder>No Image Selected</Placeholder>
                                                    }
                                               </PreviewSection>
                                               <CropperSection>
                                                    {
                                                        previewImage ? 
                                                        <Cropper
                                                            src={previewImage}
                                                            style={{height: "100%", width: "100%"}}
                                                            aspectRatio={1}
                                                            guides={false}
                                                            viewMode={1}
                                                            background={false}
                                                            responsive={true}
                                                            autoCropArea={1}
                                                            dragMode="move"
                                                            scalable={false}
                                                            zoomable={false}
                                                            ref={this.cropperRef}
                                                        /> :
                                                        <Placeholder>Select an image to start</Placeholder>
                                                    }
                                               </CropperSection>
                                            </SelectImageContainer>
                                            <ButtonContainer>
                                                <ActionButtonContainer>
                                                    <CropButton type="button" onClick={this.handleCrop}>
                                                        <CropIcon />
                                                    </CropButton>
                                                    <ResetButton type="button" onClick={this.handleReset}>
                                                        <ResetIcon />
                                                    </ResetButton>
                                                </ActionButtonContainer>
                                                <DoneButton type="button" onClick={() => this.handleDone(close)}>Done</DoneButton>
                                            </ButtonContainer>
                                        </ContentContainer>
                                    </PopupContainer>
                                )}
                            </Popup>
                        </ProfileImageContainer>
                        <ProfileDetailContainer>
                            <DetailGroup>
                                <DetailGroupHeading>Account Details</DetailGroupHeading>
                                <InfoText>
                                    <Label>Email: </Label>
                                    <Value>{email}</Value>
                                </InfoText>
                                <InfoText>
                                    <Label>Username: </Label>
                                    <Value>{username}</Value>
                                </InfoText>
                            </DetailGroup>
                            <DetailGroup>
                                <DetailGroupHeading>Basic Details</DetailGroupHeading>
                                    <InputField 
                                        type="text" 
                                        name="firstName"
                                        required
                                        placeholder="First name (e.g., John)"
                                        onChange={this.handleChange}
                                    />
                                    <InputField 
                                        type="text" 
                                        name="lastName"
                                        required
                                        placeholder="Last name (e.g., Doe)"
                                        onChange={this.handleChange}
                                    />
                                <BioContainer>
                                    <BioTextarea 
                                        name="bio"
                                        required
                                        placeholder="Write something about yourself... (keep it short & fun!)"
                                        onChange={this.handleChange}
                                    >
                                    </BioTextarea>
                                    <BioCharCount>0/200</BioCharCount>
                                </BioContainer>
                            </DetailGroup>
                            <DetailGroup>
                                <DetailGroupHeading>Profession</DetailGroupHeading>
                                    <InputField 
                                        type="text" 
                                        name="profession" 
                                        required
                                        placeholder="e.g., Software Engineer, Designer..."
                                        onChange={this.handleChange}
                                    />
                            </DetailGroup>
                            <DetailGroup>
                                <DetailGroupHeading>Social</DetailGroupHeading>
                                    <InputField 
                                        text="text" 
                                        name="socialLink" 
                                        placeholder="e.g., https://yourwebsite.com"
                                        onChange={this.handleChange}    
                                    />
                            </DetailGroup>
                            <DetailGroup>
                                <DetailGroupHeading>Location</DetailGroupHeading>
                                    <InputField 
                                        text="text" 
                                        name="location"
                                        required
                                        placeholder="Where are you from? (e.g., India, Mars)"
                                        onChange={this.handleChange}
                                    />
                            </DetailGroup>
                        </ProfileDetailContainer>
                        <ProfileActionButtonContainer>
                            <SkipButton 
                                type="button"
                                onClick={this.handleSkipProfile}
                            >
                                I'll Do This Later
                            </SkipButton>
                            <SaveButton 
                                type="submit"
                                onClick={this.handleSave}
                            >
                                Save
                            </SaveButton>
                        </ProfileActionButtonContainer>
                    </FormContainer>
                </CardContainer>
            </MainContainer>
        )
    }
}

export default CreateProfile
