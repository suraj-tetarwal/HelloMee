import {Component} from 'react'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
import {TailSpin} from 'react-loader-spinner'

import './index.css'

class EditProfile extends Component {
    state = {
        userProfileData: {},
        isLoading: true
    }

    handleSaveProfile = async () => {
        try {
            this.setState({isLoading: true})

            const jwtToken = Cookies.get("jwtToken")

            const {userProfileData} = this.state

            const url = "http://localhost:5000/profile"
            const options = {
                method: userProfileData.id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(userProfileData)
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                const {message} = data
                this.setState({isLoading: false})
                const {closeEdit} = this.props
                toast.success(message)
                closeEdit()
            } else {
                const {error} = data
                toast.error(error)
                this.setState({isLoading: false})
            }
        } catch(error) {
            toast.error("Something went wrong")
            this.setState({isLoading: false})
        }
    }

    handleCancelEditProfile = () => {
        const {closeEdit} = this.props
        closeEdit()
    }

    onChangeProfileData = event => {
        const {name, value} = event.target
        this.setState(prevState => ({
            userProfileData: {
                ...prevState.userProfileData,
                [name]: value
            }
        }))
    }

    fetchUserProfileData = async () => {
        try {
            this.setState({isLoading: true})
            const jwtToken = Cookies.get("jwtToken")

            const url = "http://localhost:5000/profile"
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(url, options)
            const data = await response.json()
            
            if  (response.ok) {
                const {userProfileData} = data
                const formattedProfileData = {
                    id: userProfileData.id,
                    username: userProfileData.username,
                    fullName: userProfileData.full_name,
                    bio: userProfileData.bio,
                    profession: userProfileData.profession,
                    socialLink: userProfileData.social_link,
                    createdAt: userProfileData.created_at
                }
                this.setState({userProfileData: formattedProfileData, isLoading: false})
            } else {
                const {error} = data
                toast.error(error)
                this.setState({isLoading: false})
            }
        } catch(error) {
            toast.error("Something went wrong")
            this.setState({isLoading: false})
        }
    }

    componentDidMount() {
        this.fetchUserProfileData()
    }

    formatDate = dateString => {
        const date = new Date(dateString)
        const now = new Date()

        const diffInSeconds = Math.floor((now - date) / 1000)

        const minutes = Math.floor(diffInSeconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (diffInSeconds < 60) {
            return "Just now"
        }

        if (minutes < 60) {
            return `${minutes} min${minutes > 1 ? "s" : ""} ago`
        }

        if (hours < 24) {
            return `${hours} hour${hours > 1 ? "s" : ""} ago`
        }

        if (days < 7) {
            return `${days} day${days > 1 ? "s" : ""} ago`
        }

        return date.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        })
    }


    render() {
        const {userProfileData, isLoading} = this.state
        const {username, fullName, bio, profession, socialLink, createdAt} = userProfileData
        return (
            <div className="edit-profile-container">
                <h1 className="edit-profile-container-heading">Edit Profile</h1>
                <p className="edit-profile-container-description-text">Update how your profile appears to others.</p>
                {
                    isLoading ? (
                        <div className="loader-container">
                            <TailSpin
                                visible={true}
                                height="80"
                                width="80"
                                color="#007BFF"
                                ariaLabel="tail-spin-loading"
                                radius="2"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : (
                        <form className="edit-profile-form-container">
                            <div className="form-field-container">
                                <label className="form-field-container-label-text">Full Name</label>
                                <input type="text" name="fullName" value={fullName ? `${fullName}` : ""} onChange={this.onChangeProfileData} placeholder="Your full name" className="form-field-container-input-box" />
                            </div>
                            <div className="form-field-container">
                                <label className="form-field-container-label-text">Username</label>
                                <input type="text" value={username} readOnly className="form-field-container-input-box" />
                            </div>
                            <div className="form-field-container">
                                <label className="form-field-container-label-text">Bio</label>
                                <textarea name="bio" value={bio ? `${bio}` : ""} onChange={this.onChangeProfileData} placeholder="A short bio about you" className="user-bio-input-box"></textarea>
                                <p className="user-bio-character-counter">{bio ? bio.length : 0}/150</p>
                            </div>
                            <div className="form-field-container">
                                <label className="form-field-container-label-text">Profession</label>
                                <input type="text" name="profession" value={profession ? `${profession}` : ""} onChange={this.onChangeProfileData} placeholder="What do you do?" className="form-field-container-input-box" />
                            </div>
                            <div className="form-field-container">
                                <label className="form-field-container-label-text">Social Link</label>
                                <input type="text" name="socialLink" value={socialLink ? `${socialLink}` : ""} onChange={this.onChangeProfileData} placeholder="https://example.com" className="form-field-container-input-box" />
                            </div>
                            <div className="form-field-container">
                                <label className="form-field-container-label-text">Joined</label>
                                <input type="text" value={this.formatDate(createdAt)} readOnly className="form-field-container-input-box" />
                            </div>
                            <div className="edit-profile-form-button-container">
                                <button type="button" className="edit-profile-save-button" onClick={this.handleSaveProfile} >Save</button>
                                <button type="button" className="edit-profile-cancel-button" onClick={this.handleCancelEditProfile} >Cancel</button>
                            </div>
                        </form>
                    )
                }
            </div>
        )
    }
}

export default EditProfile