import {Component} from 'react'

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
    ForgotYourPassword,
    SubmitButton,
    FooterContainer,
    MessageText,
    Link,
    DeveloperText,
} from './styledComponents'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
        }   
    }

    onToggleCheckbox = () => {
        this.setState(prevState => ({showPassword: !prevState.showPassword}))
    }

    render() {
        const {showPassword} = this.state
        return (
            <MainContainer>
                <CardContainer>
                    <MobileViewContainer>
                        <TextContainer>
                            <LogoText>HelloMee</LogoText>
                            <CreateAccountText>Sign in to HelloMee</CreateAccountText>
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
                        <Form>
                            {/* <FieldContainer>
                                <AiOutlineUser color="#DB35CC" size="30px" />
                                <InputBox type="text" placeholder="Username" />
                            </FieldContainer> */}
                            <FieldContainer>
                                <HiOutlineMail color="#DB35CC" size="30px" />
                                <InputBox type="text" placeholder="Email" />
                            </FieldContainer>
                            <FieldContainer>
                                <MdOutlineLock color="#DB35CC" size="30px" />
                                <InputBox type={showPassword ? "text" : "password"} placeholder="Password" />
                            </FieldContainer>
                            <ShowPasswordContainer>
                                <CheckBox id="showPassword" type="checkbox" checked={showPassword} onChange={this.onToggleCheckbox} />
                                <LabelText htmlFor="showPassword">Show Password</LabelText>
                            </ShowPasswordContainer>
                            <ForgotYourPassword href="#">Forgot your password?</ForgotYourPassword>
                            <SubmitButton type="button">
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
                    <DesktopContainer>
                        <DesktopContainerHeading>Hello, Friend!</DesktopContainerHeading>
                        <DesktopContainerText>Enter your personal details <br/> and start journey with us</DesktopContainerText>
                        <SignInButton type="button">SIGN UP</SignInButton>
                    </DesktopContainer>
                    <FooterContainer>
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