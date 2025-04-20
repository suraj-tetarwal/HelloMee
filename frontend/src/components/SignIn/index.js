import {Component} from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineLock } from "react-icons/md"
import { FaGoogle } from "react-icons/fa6"
import { FaFacebookF } from "react-icons/fa6"
import { FaLinkedinIn } from "react-icons/fa6"
import { GoTriangleRight } from "react-icons/go"

import Divider from '../Divider'

import {
    MainContainer,
    CardContainer,
    MobileViewContainer,
    DesktopContainer,
    DesktopContainerHeading,
    DesktopContainerText,
    SignInButton,
    TextContainer,
    LogoText,
    SignInText,
    DescriptionText,
    AuthButtonContainer,
    AuthButton,
    FormContainer,
    Form,
    FormHeading,
    FormText,
    DesktopAuthButtonContainer,
    DesktopAuthButton,
    GoogleIcon,
    FacebookIcon,
    LinkedinIcon,
    FieldContainer,
    InputBox,
    EmailIcon,
    PasswordIcon,
    ShowPasswordContainer,
    LabelText,
    CheckBox,
    SubmitButton,
    FooterContainer,
    ForgotYourPassword,
    MessageText,
    LinkButton,
    DeveloperText,
} from './styledComponents'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        showPassword: false,
    }

    onToggleCheckbox = () => {
        this.setState(prevState => ({showPassword: !prevState.showPassword}))
    }

    onChangeEmail = event => {
        this.setState({email: event.target.value})
    }

    onChangePassword = event => {
        this.setState({password: event.target.value})
    }

    checkProfileExists = async (jwtToken) => {
        const url = "http://localhost:5000/profile/status/"
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        const {profile_exist} = data
	return profile_exist
    }

    onSubmitForm = async (event) => {
        event.preventDefault()

        const toastId = toast.loading("Signing you in...")

        const {email, password} = this.state
        const userDetails = {
            email,
            password,
        }

        const url = "http://localhost:5000/sign-in/"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            const {jwtToken} = data
            const {history} = this.props
            Cookies.set("jwt_token", jwtToken, {expires: 30})
            toast.update(toastId, {
                render: "Welcome! Taking you to home...",
                type: "success",
                isLoading: false,
                autoClose: 3000
            })
            const isProfileExists = await this.checkProfileExists(jwtToken)
            if (isProfileExists) {
                toast.update(toastId, {
                    render: "Welcome back! Taking you to home...",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000
                })
                history.replace("/")
            }
            else {
                toast.update(toastId, {
                    render: "Almost there! Let's set up your profile",
                    type: "info",
                    isLoading: false,
                    autoClose: 3000
                })
                history.replace("/create-profile")
            }
        } else {
            const {message} = data
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 5000
            })
        }
    }

    navigateToSignUp = () => {
	const {history} = this.props
	history.replace("sign-up")
    }

    componentDidMount = () => {
	const jwtToken = Cookies.get("jwt_token")
	if (jwtToken) {
		const {history} = this.props
		history.replace("/")
	}
    }

    render() {
        const {email, password, showPassword} = this.state
        return (
            <MainContainer>
                <CardContainer>
                    <MobileViewContainer>
                        <TextContainer>
                            <LogoText>HelloMee</LogoText>
                            <SignInText>Sign in to Continue</SignInText>
                            <DescriptionText>Welcome back! Please sign in to continue</DescriptionText>
                        </TextContainer>
                        <AuthButtonContainer>
                            <AuthButton type="button">Google</AuthButton>
                            <AuthButton type="button">LinkedIn</AuthButton>
                        </AuthButtonContainer>
                        <Divider /> 
                    </MobileViewContainer>
                    <FormContainer>
                        <FormHeading>Sign in to HelloMee</FormHeading>
                        <DesktopAuthButtonContainer>
                            <DesktopAuthButton type="button">
                                <GoogleIcon />
                            </DesktopAuthButton>
                            <DesktopAuthButton type="button">
                                <FacebookIcon />
                            </DesktopAuthButton>
                            <DesktopAuthButton type="button">
                                <LinkedinIcon />
                            </DesktopAuthButton>
                        </DesktopAuthButtonContainer>
                        <FormText>or use your email to login</FormText>
                        <Form onSubmit={this.onSubmitForm}>
                            <FieldContainer>
                                <EmailIcon />
                                <InputBox 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email} 
                                    required 
                                    onChange={this.onChangeEmail}
                                /> 
                            </FieldContainer>
                            <FieldContainer>
                                <PasswordIcon />
                                <InputBox 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    required
                                    onChange={this.onChangePassword} 
                                />
                            </FieldContainer>
                            <ShowPasswordContainer>
                                <CheckBox id="showPassword" type="checkbox" checked={showPassword} onChange={this.onToggleCheckbox} />
                                <LabelText htmlFor="showPassword">Show Password</LabelText>
                            </ShowPasswordContainer>
                            <SubmitButton type="submit">
                                Sign in
                                <GoTriangleRight 
                                    style={{
                                        color: '#1A1B29',
                                        size: '20px',
                                        marginTop: '4px'
                                    }} 
                                />
                            </SubmitButton>
                        </Form>
                    </FormContainer>
                    <DesktopContainer>
                        <DesktopContainerHeading>Hello, Friend!</DesktopContainerHeading>
                        <DesktopContainerText>Enter your account details <br/> and start journey with us</DesktopContainerText>
                        <SignInButton type="button" onClick={this.navigateToSignUp}>SIGN UP</SignInButton>
                    </DesktopContainer>
                    <FooterContainer>
                        <ForgotYourPassword href="#">Forgot your password?</ForgotYourPassword>
                        <MessageText>
                            Don't have an account ? 
                            <LinkButton onClick={this.navigateToSignUp}>sign up</LinkButton>
                        </MessageText>
                        <DeveloperText>Developed By Suraj</DeveloperText>
                    </FooterContainer>              
                </CardContainer>
            </MainContainer>
        )
    }
}

export default SignIn