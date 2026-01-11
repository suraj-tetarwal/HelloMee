import {Component} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {TailSpin} from 'react-loader-spinner'

import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineLock } from "react-icons/md"
import { GoTriangleRight } from "react-icons/go"
import { LuEye, LuEyeClosed } from "react-icons/lu"
import { FaRegUser } from "react-icons/fa"

import './index.css'

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        showPassword: false,
        isLoading: false
    }

    onChangeUsername = event => {
        this.setState({username: event.target.value})
    }

    onChangeEmail = event => {
        this.setState({email: event.target.value})
    }

    onChangePassword = event => {
        this.setState({password: event.target.value})
    }

    onToggleShowPassword = () => {
        this.setState(prevState => ({showPassword: !prevState.showPassword}))
    }

    onHandleSubmitForm = async event => {
        try {
            event.preventDefault()
                    
            const {username, email, password} = this.state
            
            if (!username || !email || !password) {
                toast.error("All fields are mandatory")
                return
            }

            this.setState({isLoading: true})
        
            const userDetails = {
                username,
                email,
                password
            }
        
            const url = "http://localhost:5000/sign-up"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails)
            }
        
            const response = await fetch(url, options)
            const data = await response.json()
        
            if (response.ok) {
                const {message} = data
                toast.success(message)
                const {history} = this.props
                history.replace("/sign-in")
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        } finally {
            this.setState({isLoading: false})
        }
    }

    render() {
        const {username, email, password, showPassword, isLoading} = this.state
        return (
            <div className="sign-up-container">
                <div className="sign-up-card-container">
                    <div className="sign-up-mobile-view-container">
                        <div className="sign-up-text-container">
                            <h1 className="sign-up-logo-text">HelloMee</h1>
                            <p className="sign-up-text">Sign in to Continue</p>
                            <p className="sign-up-welcome-text">Welcome back! Please sign in to continue</p>
                        </div>
                    </div>
                    <div className="sign-up-desktop-container">
                        <h1 className="sign-up-desktop-container-heading">Welcome Back!</h1>
                        <p className="sign-up-desktop-container-text">To keep connected with us please login <br/> with your account details.</p>
                        <Link to="/sign-in" className="desktop-navigation-link">
                            <button type="button" className="sign-in-navigation-desktop-button">SIGN IN</button>
                        </Link>
                    </div>
                    <div className="sign-up-form-container">
                        <h1 className="sign-up-form-container-heading">Create Account</h1>
                        <p className="sign-up-form-container-text">use your email for registration</p>
                        <form className="form" onSubmit={this.onHandleSubmitForm}>
                            <div className="sign-up-form-field-container">
                                <FaRegUser className="sign-up-form-icon" />
                                <input type="text" placeholder='Username' value={username} onChange={this.onChangeUsername} className="sign-up-form-input-box" /> 
                            </div>
                            <div className="sign-up-form-field-container">
                                <HiOutlineMail className="sign-up-form-icon" />
                                <input type="email" placeholder='Email' value={email} onChange={this.onChangeEmail} className="sign-up-form-input-box" /> 
                            </div>
                            <div className="sign-up-form-field-container">
                                <MdOutlineLock className="sign-up-form-icon" />
                                <input type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={this.onChangePassword} className="sign-up-form-input-box" />
                                <button type="button" onClick={this.onToggleShowPassword} className="sign-up-form-show-password-button">
                                    {
                                        showPassword ? <LuEye className="sign-up-form-icon" /> : <LuEyeClosed className="sign-up-form-icon" />
                                    }
                                </button>
                            </div>
                            {
                                isLoading ? (
                                    <div className="sign-up-loader-container">
                                        <TailSpin
                                            visible={true}
                                            height="25"
                                            width="25"
                                            color="#007BFF"
                                            ariaLabel="tail-spin-loading"
                                            radius="2"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    </div>
                                ) : (
                                    <button type="submit" className="sign-up-button">
                                        Sign up
                                        <GoTriangleRight 
                                            style={{
                                                color: '#1A1B29',
                                                size: '20px',
                                                marginTop: '4px'
                                            }} 
                                        />
                                    </button>
                                )
                            }
                        </form>
                    </div>
                    <div className="sign-up-footer-container">
                        <p className="forgot-password-text">Forgot your password?</p>
                        <p className="sign-up-message-text">
                            Don't have an account ?
                            <Link to="/sign-in" className="sign-in-navigation-button">sign in</Link>
                        </p>
                        <p className="sign-up-developer-text">Developed By Suraj</p>
                    </div>              
                </div>
            </div>
        )
    }
}

export default SignUp