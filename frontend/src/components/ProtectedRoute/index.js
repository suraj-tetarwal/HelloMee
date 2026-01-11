import {Route, Redirect} from "react-router-dom"
import Cookies from "js-cookie"

import Layout from "../Layout"

const ProtectedRoute = ({component: Component, ...rest}) => {
    const token = Cookies.get("jwtToken")

    if (!token) {
        return <Redirect to="/sign-in" />
    }

    return (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    )
}

export default ProtectedRoute
