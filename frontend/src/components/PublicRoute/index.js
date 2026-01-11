import {Route, Redirect} from "react-router-dom"
import Cookies from "js-cookie"

const PublicRoute = props => {
    const token = Cookies.get("jwtToken")

    if (token !== undefined) {
        return <Redirect to="/" />
    }

    return <Route {...props} />
}

export default PublicRoute
