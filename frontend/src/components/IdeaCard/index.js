import { MdDelete } from "react-icons/md"

import './index.css'

const IdeaCard = (props) => {
    const {ideaData, onDeleteIdea, postIdea} = props
    const {content, id} = ideaData

    const onDelete = (event) => {
        event.stopPropagation()
        onDeleteIdea(id)
    }

    const onPost = () => {
        postIdea(id)
    }

    return (
        <li className="idea-card-container"  onClick={onPost}>
            <p className="idea-card-text">{content.length > 50 ? `${content.slice(0, 50)}...` : content }</p>
            <button type="button" className="delete-idea-button" onClick={onDelete}>
                <MdDelete className="delete-idea-button-icon" />
            </button>
        </li>
    )
}

export default IdeaCard