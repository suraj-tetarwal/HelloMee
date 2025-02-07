import {Component} from 'react'
import {Navigate} from 'react-router-dom'

import { AiOutlineUser } from "react-icons/ai"
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
    FieldContainer,
    InputBox,
    ShowPasswordContainer,
    LabelText,
    CheckBox,
    ErrorMessage,
    SubmitButton,
    FooterContainer,
    MessageText,
    Link,
    DeveloperText,
} from './styledComponents'

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        errorMsg: '',
        showPassword: false,
        redirectToSignin: false,
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

    onSubmitSuccess = () => {
        this.setState({redirectToSignin: true})
    }

    onSubmitFailure = (message) => {
        this.setState({showErrorMsg: true, errorMsg: message})
    }

    isValidEmail = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    isStrongPassword = password => {
        return password.length >= 8
    }

    onSubmitForm = async (event) => {
        event.preventDefault()
        const {username, email, password} = this.state
        const userDetails = {username, email, password}

        let error = ""

        if (!username) {
            error = "Username is required"
        } else if (!email) {
            error = "Email is required"
        } else if (!this.isValidEmail(email)) {
            error = "Invalid email format"
        } else if (!password) {
            error = "Password is required"
        } else if (!this.isStrongPassword(password)) {
            error = "Password must be al least 8 characters long"
        } 

        if (error) {
            this.setState({errorMsg: error})
            return
        }

        const url = "http://localhost:5000/signup/"
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
            this.onSubmitSuccess()
        }
        else {
            this.onSubmitFailure(data.message)
        }
    }

    render() {
        const {showPassword, username, email, password, redirectToSignin, errorMsg} = this.state

        if (redirectToSignin) {
            return <Navigate to="/signin" />
        }

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
                        <DesktopContainerText>To keep connected with us please login <br/> with your personal info</DesktopContainerText>
                        <SignInButton type="button">SIGN IN</SignInButton>
                    </DesktopContainer>
                    <FormContainer>
                        <FormHeading>Create Account</FormHeading>
                        <DesktopAuthButtonContainer>
                            <DesktopAuthButton type="button">
                                <FaGoogle color="#DB35CC" size="20px" />
                            </DesktopAuthButton>
                            <DesktopAuthButton type="button">
                                <FaFacebookF color="#DB35CC" size="20px" />
                            </DesktopAuthButton>
                            <DesktopAuthButton type="button">
                                <FaLinkedinIn color="#DB35CC" size="20px" />
                            </DesktopAuthButton>
                        </DesktopAuthButtonContainer>
                        <FormText>or use your email for registration</FormText>
                        <Form onSubmit={this.onSubmitForm}>
                            <FieldContainer>
                                <AiOutlineUser color="#DB35CC" size="30px" />
                                <InputBox type="text" placeholder="Username" value={username} onChange={this.onChangeUsername} />
                            </FieldContainer>
                            <FieldContainer>
                                <HiOutlineMail color="#DB35CC" size="30px" />
                                <InputBox type="text" placeholder="Email" value={email} onChange={this.onChangeEmail} />
                            </FieldContainer>
                            <FieldContainer>
                                <MdOutlineLock color="#DB35CC" size="30px" />
                                <InputBox type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={this.onChangePassword} />
                            </FieldContainer>
                            <ShowPasswordContainer>
                                <CheckBox id="showPassword" type="checkbox" checked={showPassword} onChange={this.onToggleCheckbox} />
                                <LabelText htmlFor="showPassword">Show Password</LabelText>
                            </ShowPasswordContainer>
                            {errorMsg && <ErrorMessage>*{errorMsg}</ErrorMessage>}
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
                            <Link href="#"> sign in</Link>
                        </MessageText>
                        <DeveloperText>Developed By Suraj</DeveloperText>
                    </FooterContainer>              
                </CardContainer>
            </MainContainer>
        )
    }
}

export default SignUp