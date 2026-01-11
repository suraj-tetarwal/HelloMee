import {withRouter} from 'react-router-dom'

import Sidebar from '../Sidebar'
import Ideas from '../Ideas'

import './index.css'

const Layout = props => {
    const {children, location} = props
    const {pathname} = location
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="layout-main-content-container">
                {children}
            </div>
            {
                pathname !== '/ideas' && (
                    <div className="layout-notes-container">
                        <Ideas />
                    </div>
                )
            }
        </div>
    )
}

export default withRouter(Layout)