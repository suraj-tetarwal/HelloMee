import {Link} from 'react-router-dom'

import './index.css'

const UserCard = (props) => {
    const {userData} = props
    const {id, username, fullName} = userData

    const getInitial = name => name?.trim()?.charAt(0)?.toUpperCase() || ''

    return (
        <Link to={`/users/profile/${id}`} className="user-card-link">
            <li className="user-card-container">
                <div className="user-card-avatar-container">{getInitial(username)}</div>
                <div className="user-detail-container">
                    <p className="user-card-full-name-text">{fullName}</p>
                    <p className="user-card-username-text">@{username}</p>
                </div>
            </li>
        </Link>
    )
}

export default UserCard 