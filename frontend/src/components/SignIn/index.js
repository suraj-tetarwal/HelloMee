import {Component} from 'react'

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
    FieldContainer,
    InputBox,
    ShowPasswordContainer,
    LabelText,
    CheckBox,
    ErrorMessage,
    SubmitButton,
    FooterContainer,
    ForgotYourPassword,
    MessageText,
    Link,
    DeveloperText,
} from './styledComponents'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        errorMsg: '',
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

    isValidEmail = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    onSubmitSuccess = jwtToken => {
        console.log(jwtToken)
    }

    onSubmitFailure = message => {
        this.setState({errorMsg: message})
    }

    onSubmitForm = async (event) => {
        event.preventDefault()
        const {email, password} = this.state

        let error = ""

        if (!email) {
            error = "Email is required"
        } else if (!this.isValidEmail(email)) {
            error = "Invalid email format"
        } else if (!password) {
            error = "Password is required"
        }

        if (error) {
            this.setState({errorMsg: error})
            return
        }
        this.setState({errorMsg: ""})

        const userDetails = {
            email,
            password,
        }

        const url = "http://localhost:5000/signin/"
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
            this.onSubmitSuccess(data.jwtToken)
        } else {
            this.onSubmitFailure(data.message)
        }
    }

    render() {
        const {email, password, errorMsg, showPassword} = this.state
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
                                <FaGoogle color="#DB35CC" size="20px" />
                            </DesktopAuthButton>
                            <DesktopAuthButton type="button">
                                <FaFacebookF color="#DB35CC" size="20px" />
                            </DesktopAuthButton>
                            <DesktopAuthButton type="button">
                                <FaLinkedinIn color="#DB35CC" size="20px" />
                            </DesktopAuthButton>
                        </DesktopAuthButtonContainer>
                        <FormText>or use your email to login</FormText>
                        <Form onSubmit={this.onSubmitForm}>
                            <FieldContainer>
                                <HiOutlineMail color="#DB35CC" size="30px" />
                                <InputBox type="text" placeholder="Email" onChange={this.onChangeEmail} value={email} />
                            </FieldContainer>
                            <FieldContainer>
                                <MdOutlineLock color="#DB35CC" size="30px" />
                                <InputBox type={showPassword ? "text" : "password"} placeholder="Password" onChange={this.onChangePassword} value={password} />
                            </FieldContainer>
                            <ShowPasswordContainer>
                                <CheckBox id="showPassword" type="checkbox" checked={showPassword} onChange={this.onToggleCheckbox} />
                                <LabelText htmlFor="showPassword">Show Password</LabelText>
                            </ShowPasswordContainer>
                            {errorMsg && <ErrorMessage>*{errorMsg}</ErrorMessage>}
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
                        <DesktopContainerText>Enter your personal details <br/> and start journey with us</DesktopContainerText>
                        <SignInButton type="button">SIGN UP</SignInButton>
                    </DesktopContainer>
                    <FooterContainer>
                        <ForgotYourPassword href="#">Forgot your password?</ForgotYourPassword>
                        <MessageText>
                            Don't have an account ? 
                            <Link href="#"> sign up</Link>
                        </MessageText>
                        <DeveloperText>Developed By Suraj</DeveloperText>
                    </FooterContainer>              
                </CardContainer>
            </MainContainer>
        )
    }
}

export default SignIn