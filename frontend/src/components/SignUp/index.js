import { Component } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import Divider from '../Divider'

import { FaGoogle } from "react-icons/fa6"
import { FaFacebookF } from "react-icons/fa6"
import { FaLinkedinIn } from "react-icons/fa6"
import { GoTriangleRight } from "react-icons/go"

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
    CreateAccountText,
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
    UserIcon,
    EmailIcon,
    PasswordIcon,
    ShowPasswordContainer,
    LabelText,
    CheckBox,
    SubmitButton,
    FooterContainer,
    MessageText,
    LinkButton,
    DeveloperText,
} from './styledComponents'

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        showPassword: false,
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

    onToggleCheckbox = () => {
        this.setState(prevState => ({showPassword: !prevState.showPassword}))
    }

    onSubmitForm = async (event) => {
        event.preventDefault()

        const toastId = toast.loading("Creating your account...")
        
        const {username, email, password} = this.state
        const userDetails = {username, email, password}

        const url = "http://localhost:5000/sign-up/"
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
            const {history} = this.props
            toast.update(toastId, {
                render: "Boom! Your account is ready. Now, sign in and let's go!",
                type: "success",
                isLoading: false,
                autoClose: 5000
            })
            history.replace('/sign-in')
        }
        else {
            const {message} = data
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 5000
            })
        }
    }

    navigateToSignIn = () => {
	const {history} = this.props
	history.replace("/sign-in")
    }

    componentDidMount = () => {
	const jwtToken = Cookies.get("jwt_token")
	if (jwtToken) {
		const {history} = this.props
		history.replace("/")
	}
    }

    render() {
        const {showPassword, username, email, password} = this.state
        return (
            <MainContainer>
                <CardContainer>
                    <MobileViewContainer>
                        <TextContainer>
                            <LogoText>HelloMee</LogoText>
                            <CreateAccountText>Create your account</CreateAccountText>
                            <DescriptionText>Welcome! Please fill in the details to get started</DescriptionText>
                        </TextContainer>
                        <AuthButtonContainer>
                            <AuthButton type="button">Google</AuthButton>
                            <AuthButton type="button">LinkedIn</AuthButton>
                        </AuthButtonContainer>
                        <Divider /> 
                    </MobileViewContainer>
                    <DesktopContainer>
                        <DesktopContainerHeading>Welcome Back!</DesktopContainerHeading>
                        <DesktopContainerText>To keep connected with us please login <br/> with your account details.</DesktopContainerText>
                        <SignInButton type="button" onClick={this.navigateToSignIn}>SIGN IN</SignInButton>
                    </DesktopContainer>
                    <FormContainer>
                        <FormHeading>Create Account</FormHeading>
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
                        <FormText>or use your email for registration</FormText>
                        <Form onSubmit={this.onSubmitForm}>
                            <FieldContainer>
                                <UserIcon />
                                <InputBox 
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    required    
                                    onChange={this.onChangeUsername}
                                />
                            </FieldContainer>
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
                                    onChange={this.onChangePassword} />
                            </FieldContainer>
                            <ShowPasswordContainer>
                                <CheckBox id="showPassword" type="checkbox" checked={showPassword} onChange={this.onToggleCheckbox} />
                                <LabelText htmlFor="showPassword">Show Password</LabelText>
                            </ShowPasswordContainer>
                            <SubmitButton type="submit">
                                Continue 
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
                    <FooterContainer>
                        <MessageText>
                            Already have an account ?  
                            <LinkButton onClick={this.navigateToSignIn}>sign in</LinkButton>
                        </MessageText>
                        <DeveloperText>Developed By Suraj</DeveloperText>
                    </FooterContainer>              
                </CardContainer>
            </MainContainer>
        )
    }
}

export default SignUp