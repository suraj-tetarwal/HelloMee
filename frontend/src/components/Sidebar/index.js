import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import AuthContext from '../../AuthContext'

import { FaUser, FaBookmark, FaLightbulb } from "react-icons/fa6"
import { IoMenu, IoHome, IoSearch } from "react-icons/io5"
import { MdAddToPhotos } from "react-icons/md"
import { CiLogout } from "react-icons/ci"

import './index.css'

class Sidebar extends Component {
    state = {
        isMenuOpen: false 
    }

    toggleMenu = () => {
        this.setState(prevState => ({isMenuOpen: !prevState.isMenuOpen}))
    }

    handleLogout = () => {
        const {history} = this.props
        Cookies.remove("jwtToken")
        history.replace("/sign-in")
    }

    render() {
        return <AuthContext.Consumer>
            {value => {
                const {isMenuOpen} = this.state
                const {location} = this.props
                const {pathname} = location
                const {loggedInUserId} = value

                return (
                    <div className="sidebar-container">
                        <div className="mobile-topbar-container">
                            <button className="mobile-topbar-button" onClick={this.toggleMenu}>
                                <IoMenu className="mobile-icon" />
                            </button>
                            <h1 className="mobile-logo-text">HelloMee.com</h1>
                            <button className="mobile-topbar-button" onClick={this.handleLogout}>
                                <CiLogout className="logout-mobile-icon" />
                            </button>
                        </div>

                        <div className={`mobile-menu-drawer ${isMenuOpen ? "open" : ""}`}>
                            <ul className="mobile-menu-container">
                                <Link to={`/users/profile/${loggedInUserId}`} className="mobile-menu-item-link">
                                    <li className={pathname === `/users/profile/${loggedInUserId}` ? "mobile-menu-item active-mobile-menu-item" : "mobile-menu-item"}>
                                        <FaUser className="mobile-menu-item-icon" />
                                        <p className="mobile-menu-item-text">Profile</p>
                                    </li>
                                </Link>
                                <Link to="/" className="mobile-menu-item-link">
                                    <li className={pathname === "/" ? "mobile-menu-item active-mobile-menu-item" : "mobile-menu-item"}>
                                        <IoHome className="mobile-menu-item-icon" />
                                        <p className="mobile-menu-item-text">Home</p>
                                    </li>
                                </Link>
                                <Link to="/create" className="mobile-menu-item-link">
                                    <li className={pathname === "/create" ? "mobile-menu-item active-mobile-menu-item" : "mobile-menu-item"}>
                                        <MdAddToPhotos className="mobile-menu-item-icon" />
                                        <p className="mobile-menu-item-text">Create</p>
                                    </li>
                                </Link>
                                <Link to="/ideas" className="mobile-menu-item-link">
                                    <li className={pathname === "/ideas" ? "mobile-menu-item active-mobile-menu-item" : "mobile-menu-item"}>
                                        <FaLightbulb className="mobile-menu-item-icon" />
                                        <p className="mobile-menu-item-text">Ideas</p>
                                    </li>
                                </Link>
                                <Link to="/bookmark" className="mobile-menu-item-link">
                                    <li className={pathname === "/bookmark" ? "mobile-menu-item active-mobile-menu-item" : "mobile-menu-item"}>
                                        <FaBookmark className="mobile-menu-item-icon" />
                                        <p className="mobile-menu-item-text">Bookmark</p>
                                    </li>
                                </Link>
                                <Link to="/search" className="mobile-menu-item-link">
                                    <li className={pathname === "/search" ? "mobile-menu-item active-mobile-menu-item" : "mobile-menu-item"}>
                                        <IoSearch className="mobile-menu-item-icon" />
                                        <p className="mobile-menu-item-text">Search</p>
                                    </li>
                                </Link>
                            </ul>
                            <button className="mobile-menu-drawer-close-button" onClick={this.toggleMenu}>Close</button>
                        </div>

                        {
                            isMenuOpen && (
                                <div className="overlay-container" onClick={this.toggleMenu}></div>
                            )
                        }

                        <div className="desktop-sidebar-container">
                            <h1 className="desktop-logo-text">HelloMee.com</h1>
                            <ul className="desktop-menu-container">
                                <Link to={`/users/profile/${loggedInUserId}`} className="desktop-menu-item-link">
                                    <li className={pathname === `/users/profile/${loggedInUserId}` ? "desktop-menu-item active-desktop-menu-item" : "desktop-menu-item"}>
                                        <FaUser className="desktop-menu-item-icon" />
                                        <p className="desktop-menu-text">Profile</p>
                                    </li>
                                </Link>
                                <Link to="/" className="desktop-menu-item-link">
                                    <li className={pathname === "/" ? "desktop-menu-item active-desktop-menu-item" : "desktop-menu-item"}>
                                        <IoHome className="desktop-menu-item-icon" />
                                        <p className="desktop-menu-text">Home</p>
                                    </li>
                                </Link>
                                <Link to="/create" className="desktop-menu-item-link">
                                    <li className={pathname === "/create" ? "desktop-menu-item active-desktop-menu-item" : "desktop-menu-item"}>
                                        <MdAddToPhotos className="desktop-menu-item-icon" />
                                        <p className="desktop-menu-text">Create</p>
                                    </li>
                                </Link>
                                <Link to="/bookmark" className="desktop-menu-item-link">
                                    <li className={pathname === "/bookmark" ? "desktop-menu-item active-desktop-menu-item" : "desktop-menu-item"}>
                                        <FaBookmark className="desktop-menu-item-icon" />
                                        <p className="desktop-menu-text">Bookmark</p>
                                    </li>
                                </Link>
                                <Link to="/search" className="desktop-menu-item-link">
                                    <li className={pathname === "/search" ? "desktop-menu-item active-desktop-menu-item" : "desktop-menu-item"}>
                                        <IoSearch className="desktop-menu-item-icon" />
                                        <p className="desktop-menu-text">Search</p>
                                    </li>
                                </Link>
                            </ul>
                            <button className="desktop-logout-button" onClick={this.handleLogout}>Logout</button>
                        </div>
                    </div>
                )
            }}
        </AuthContext.Consumer>
    }
}

export default withRouter(Sidebar)