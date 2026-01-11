import {Link} from "react-router-dom"

import "./index.css"

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-text">
                The page you are looking for doesn’t exist.
            </p>
            <Link to="/" className="not-found-link">
                Go back home
            </Link>
        </div>
    )
}

export default NotFound
