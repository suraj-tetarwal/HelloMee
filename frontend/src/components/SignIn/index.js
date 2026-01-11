import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
import {TailSpin} from 'react-loader-spinner'

import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineLock } from "react-icons/md"
import { GoTriangleRight } from "react-icons/go"
import { LuEye, LuEyeClosed } from "react-icons/lu"

import './index.css'

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        showPassword: false,
        isLoading: false,
    }

    onChangeEmail = event => {
        this.setState({email: event.target.value})
    }

    onChangePassword = event => {
        this.setState({password: event.target.value})
    }

    onSubmitForm = async event => {
        try {
            event.preventDefault()

            
            const {email, password} = this.state
            
            if (!email || !password) {
                toast.error("All fields are mandetory")
                return
            }
            
            this.setState({isLoading: true})
            
            const userDetails = {
                email,
                password
            }

            const url = "http://localhost:5000/sign-in"
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
                const {jwt_token} = data
                const {history} = this.props
                Cookies.set("jwtToken", jwt_token, {expires: 30})
                history.replace("/")
                toast.success("Logged in Successfully")
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

    onToggleShowPassword = () => {
        this.setState(prevState => ({showPassword: !prevState.showPassword}))
    }

    render() {
        const {email, password, showPassword, isLoading} = this.state
         return (
            <div className="sign-in-container">
                <div className="sign-in-card-container">
                    <div className="sign-in-mobile-view-container">
                        <div className="sign-in-text-container">
                            <h1 className="sign-in-logo-text">HelloMee</h1>
                            <p className="sign-in-text">Sign in to Continue</p>
                            <p className="sign-in-welcome-text">Welcome back! Please sign in to continue</p>
                        </div>
                    </div>
                    <div className="sign-in-form-container">
                        <h1 className="sign-in-form-container-heading">Sign in to HelloMee</h1>
                        <p className="sign-in-form-container-text">use your email to login</p>
                        <form className="form" onSubmit={this.onSubmitForm}>
                            <div className="sign-in-form-field-container">
                                <HiOutlineMail className="sign-in-form-icon" />
                                <input type="email" placeholder='Email' value={email} onChange={this.onChangeEmail} className="sign-in-form-input-box" /> 
                            </div>
                            <div className="sign-in-form-field-container">
                                <MdOutlineLock className="sign-in-form-icon" />
                                <input type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={this.onChangePassword} className="sign-in-form-input-box" />
                                <button type="button" className="sign-in-toggle-password-button" onClick={this.onToggleShowPassword}>
                                    {showPassword ? <LuEye className="sign-in-form-icon" /> : <LuEyeClosed className="sign-in-form-icon" />}
                                </button>
                            </div>
                            {
                                isLoading ? (
                                    <div className="sign-in-loader-container">
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
                                    <button type="submit" className="sign-in-button">
                                        Sign in
                                        <GoTriangleRight 
                                            style={{
                                                color: '#FFFFFF',
                                                size: '20px',
                                                marginTop: '4px'
                                            }} 
                                        />
                                    </button>
                                )
                            }
                        </form>
                    </div>
                    <div className="sign-in-desktop-container">
                        <h1 className="sign-in-desktop-container-heading">Hello, Friend!</h1>
                        <p className="sign-in-desktop-container-text">Enter your account details <br/> and start journey with us</p>
                        <Link to="/sign-up" className="desktop-navigation-link">
                            <button type="button" className="sign-up-navigatio-desktop-button">SIGN UP</button>
                        </Link>
                    </div>
                    <div className="sign-in-footer-container">
                        <p className="forgot-password-text">Forgot your password?</p>
                        <p className="sign-in-message-text">
                            Don't have an account ? 
                            <Link to="/sign-up" className="sign-up-navigation-button">sign up</Link>
                        </p>
                        <p className="sign-in-developer-text">Developed By Suraj</p>
                    </div>              
                </div>
            </div>
        )
    }
}

export default SignIn