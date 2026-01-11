import {Component} from 'react'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'

import IdeaCard from '../IdeaCard'

import './index.css'

class Ideas extends Component {
    state = {
        ideasList: [],
        ideaContentText: "",
        selectedIdeaId: null
    }

    createPost = async () => {
        try {
            const jwtToken = Cookies.get("jwtToken")

            const {ideaContentText, selectedIdeaId} = this.state

            if (!ideaContentText) {
                alert("Nothing to post")
                return
            }

            const url = "http://localhost:5000/posts"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify({textContent: ideaContentText.trim()})
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                const {message} = data
                toast.success(message)
                this.onDeleteIdea(selectedIdeaId)
                this.setState({ideaContentText: "", selectedIdeaId: null})
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    postIdea = async (ideaId) => {
        const {ideasList} = this.state
        const [selectedIdea] = ideasList.filter(eachIdea => eachIdea.id === ideaId)
        this.setState({ideaContentText: selectedIdea.content, selectedIdeaId: ideaId})
    }

    handlePost = (ideaId) => {
        if (ideaId) {
            this.postIdea()
        } else {
            this.createPost()
        }
    }

    onChangeText = event => {
        const value = event.target.value
        if (value.length <= 200) {
            this.setState({ideaContentText: value})
        }
    }

    handleSaveIdea = async () => {
        try {
            const jwtToken = Cookies.get("jwtToken")

            const {ideaContentText, selectedIdeaId} = this.state

            const url = selectedIdeaId ? `http://localhost:5000/ideas/${selectedIdeaId}` : "http://localhost:5000/ideas" 
            const options = {
                method: selectedIdeaId ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify({content: ideaContentText})
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                const {message} = data
                toast.success(message)
                this.setState({ideaContentText: "", selectedIdeaId: null})
                this.fetchIdeasList()
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    onDeleteIdea = async (id) => {
        try {
            const {ideasList} = this.state

            const jwtToken = Cookies.get("jwtToken")

            const updatedIdeasList = ideasList.filter(eachIdea => eachIdea.id !== id)

            this.setState({ideasList: updatedIdeasList})

            const url = `http://localhost:5000/ideas/${id}`
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(url, options)
            const data = await response.json() 

            if (response.ok) {
                const {message} = data
                toast.success(message)
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    fetchIdeasList = async () => {
        try {
            const jwtToken = Cookies.get("jwtToken")

            const url = "http://localhost:5000/ideas"
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                const {ideasList} = data
                this.setState({ideasList})
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    componentDidMount() {
        this.fetchIdeasList()
    }

    render() {
        const {ideasList, ideaContentText, selectedIdeaId} = this.state
        return (
            <div className="ideas-component-container">
                <h1 className="ideas-container-heading">Ideas</h1>
                <p className="ideas-container-description-text">Save post ideas or captions here. Share them when you’re ready.</p>
                <form className="ideas-component-form-container">
                    <textarea className="ideas-component-form-text-input-box" value={ideaContentText} onChange={this.onChangeText}></textarea>
                    <p className="idea-character-counter">{ideaContentText.length}/200</p>
                    <div className="ideas-component-form-button-container">
                        <button type="button" className="save-idea-button" onClick={this.handleSaveIdea}>{selectedIdeaId ? "Update" : "Save"}</button>
                        <button type="button" className="post-now-button" onClick={() => this.handlePost()}>{selectedIdeaId ? "Post Idea" : "Post Now"}</button>
                    </div>
                </form>
                <h1 className="your-ideas-list-heading">Your Ideas</h1>
                {
                    ideasList.length !== 0  ? (
                        <ul className="ideas-list-container">
                            {
                                ideasList.map(eachIdea => 
                                    <IdeaCard ideaData={eachIdea} key={eachIdea.id} onDeleteIdea={this.onDeleteIdea} postIdea={this.postIdea} />
                                )
                            }
                        </ul>
                    ) : (
                        <p className="empty-idea-list-text">No Ideas</p>
                    )
                }
            </div>
        )
    }
}

export default Ideas