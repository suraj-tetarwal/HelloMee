import {Component} from 'react'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
import {TailSpin} from 'react-loader-spinner'

import Cropper from 'react-easy-crop'

import { FaRegSquarePlus } from "react-icons/fa6"
import { BiImageAdd } from "react-icons/bi"

import './index.css'

class CreatePost extends Component {
    state = {
        isModalOpen: false,
        textContent: "",
        imageFile: null,
        modalPreviewImageUrl: null,
        croppedPreviewImageUrl: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        croppedAreaPixels: null,
        isSubmitting: false,
    }

    handleImageInput = event => {
        const file = event.target.files[0]

        if (!file.type.startsWith("image/")) {
            alert("Only image is allowed")
            return
        }
        
        const MAX_SIZE = 5 * 1024 * 1024
        if (file.size > MAX_SIZE) {
            alert("Image size must be less than 5MB")
            return
        }

        const previewImageUrl = URL.createObjectURL(file)

        this.setState({
            imageFile: file,
            previewImageUrl
        })
    }

    handleTextInput = event => {
        const {textContent} = this.state
        if (textContent.length >= 200) {
            return
        } 
        this.setState({textContent: event.target.value})
    }

    onSubmitForm = async event => {
        try {
            this.setState({isSubmitting: true})

            event.preventDefault()

            const jwtToken = Cookies.get("jwtToken")

            const {imageFile, textContent} = this.state

            const formData = new FormData()

            if (textContent) {
                formData.append("textContent", textContent)
            }

            if (imageFile) {
                formData.append("imageFile", imageFile)
            }

            const url = "http://localhost:5000/posts"
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                body: formData
            }

            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                const {message} = data
                this.setState({
                    textContent: "",
                    imageFile: null,
                    previewImageUrl: null,
                    croppedPreviewImageUrl: null,
                    modalPreviewImageUrl: null,
                    isSubmitting: false
                })
                toast.success(message)
            } else {
                const {error} = data
                toast.error(error)
                this.setState({isSubmitting: false})
            }
        } catch(error) {
            toast.error("Something went wrong")
            this.setState({isSubmitting: false})
        }
    }

    closeCropModal = () => {
        this.setState({isModalOpen: false})
    }

    getCroppedImageBlob = (imageSrc, croppedAreaPixels) => {
        const MAX_SIZE = 400

        return new Promise((resolve, reject) => {
            const image = new Image()
            image.src = imageSrc

            image.onload = () => {
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")

                // force square output
                canvas.width = MAX_SIZE
                canvas.height = MAX_SIZE

                const scaleX = image.naturalWidth / image.width
                const scaleY = image.naturalHeight / image.height

                ctx.drawImage(
                    image,
                    croppedAreaPixels.x * scaleX,
                    croppedAreaPixels.y * scaleY,
                    croppedAreaPixels.width * scaleX,
                    croppedAreaPixels.height * scaleY,
                    0,
                    0,
                    MAX_SIZE,
                    MAX_SIZE
                )

                canvas.toBlob(
                    blob => {
                        if (!blob) {
                            reject(new Error("Canvas failed"))
                            return
                        }
                        resolve(blob)
                    },
                    "image/jpeg",
                    0.9
                )
            }

            image.onerror = () => reject(new Error("Image load failed"))
        })
    }

    handleCropImage = async () => {
        const {previewImageUrl, croppedAreaPixels} = this.state

        if (!croppedAreaPixels) return

        try {
            const croppedBlob = await this.getCroppedImageBlob(
                previewImageUrl,
                croppedAreaPixels
            )

            const croppedPreviewUrl = URL.createObjectURL(croppedBlob)

            this.setState({
                imageFile: croppedBlob,
                croppedPreviewImageUrl: croppedPreviewUrl,
                isModalOpen: false,
            })
        } catch {
            toast.error("Unable to crop image")
        }
    }

    renderCropModal = () => {
        const {previewImageUrl} = this.state
        return (
            <div className="crop-modal-overlay-container">
                <div className="crop-modal-content-container">
                    <div className="input-field-container">
                        <button type="button" className="add-image-button">
                            <label htmlFor='imageInput'>
                                <FaRegSquarePlus className="add-image-icon" />
                            </label>
                        </button>
                        <p className="add-image-text">Add Image</p>
                        <input type="file" id="imageInput" accept='image/*' className="image-input-element" onChange={this.handleImageInput} />
                    </div>
                    <p className="crop-modal-text">Please crop image before uploading.</p>
                    <div className="crop-image-container">
                    {
                        previewImageUrl && (
                                <Cropper
                                    image={previewImageUrl}
                                    crop={this.state.crop}
                                    zoom={this.state.zoom}
                                    maxZoom={3}
                                    objectFit='cover'
                                    aspect={1}
                                    onCropChange={crop => this.setState({crop})}
                                    onZoomChange={zoom => this.setState({zoom})}
                                    onCropComplete={(croppedArea, croppedAreaPixels) =>
                                        this.setState({croppedAreaPixels})
                                    }
                                />
                            )
                        }
                    </div>
                    <div className="crop-modal-button-container">
                        <button type="button" onClick={this.handleCropImage} className="crop-modal-crop-button">Crop</button>
                        <button type="button" onClick={this.closeCropModal} className="crop-modal-close-button">Close</button>
                    </div>
                </div>
            </div>
        )
    }

    handleModalState = () => {
        this.setState({isModalOpen: true})
    }

    render() {
        const {isModalOpen, croppedPreviewImageUrl, textContent, isSubmitting} = this.state
        return (
            <div className="create-post-container">
                <h1 className="create-post-heading-text">Create Post</h1>
                <form className="create-post-form-container" onSubmit={this.onSubmitForm}>
                    {isModalOpen && this.renderCropModal()}
                    <button type="button" onClick={this.handleModalState} className="open-crop-modal-button">
                        <BiImageAdd className="add-image-icon" />
                    </button>
                    {
                        croppedPreviewImageUrl && (
                            <div className="cropped-image-preview-container">
                                <img src={croppedPreviewImageUrl} alt="preview-post-image" className="cropped-preview-image" />
                            </div>
                        )
                    }
                    <div className="input-field-container">
                        <textarea className="text-input-element" value={textContent} onChange={this.handleTextInput}></textarea>
                        <p className="character-counter-text">{textContent.length}/200</p>
                    </div>
                    {
                        isSubmitting ? (
                            <div className="create-post-loader-container">
                                <TailSpin
                                    visible={true}
                                    height="50"
                                    width="50"
                                    color="#007BFF"
                                    ariaLabel="tail-spin-loading"
                                    radius="2"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                        ) : (
                            <div className="button-container">
                                <button type="submit" className="post-button">Post</button>
                                <button type="button" className="reset-button">Reset</button>
                            </div>
                        )
                    }
                </form>
            </div>
        )
    }
}

export default CreatePost