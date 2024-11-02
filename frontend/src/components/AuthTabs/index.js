import {Link, useLocation} from 'react-router-dom'

import {ListContainer, TabItem} from './styledComponents'

const AuthTabs = () => {
    const location = useLocation()
    console.log(location)
    console.log(location.pathname)

    return (
        <ListContainer>
            <Link to="/signup">
                <TabItem isActive={location.pathname === 'signup' ? 'active' : 'inactive'} >
                    SIGN UP
                </TabItem>
            </Link>
            <Link to="/signin">
                <TabItem isActive={location.pathname === 'signin' ? 'active' : 'inactive'} >
                    SIGN IN
                </TabItem>
            </Link>
        </ListContainer>
    )
}
export default AuthTabs