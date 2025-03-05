import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
    const token = Cookies.get('jwt_token')
    if (!token) {
        return <Redirect to="/sign-in" />
    }
    return <Route {...props} />
}

export default ProtectedRoute