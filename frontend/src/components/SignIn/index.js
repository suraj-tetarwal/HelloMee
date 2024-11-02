import {Component} from 'react'

import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineLock } from "react-icons/md"

import AuthTabs from '../AuthTabs'

import {
    MainContainer,
    CardContainer,
    TopContainer,
    TopContainerHeading,
    TopContainerText,
    BottomContainer,
    BottomContainerHeading,
    FormContainer,
    InputFieldContainer,
    InputBox,
    SignInButton,
} from './styledComponents'

class LoginRoute extends Component {
    render() {
        return (
            <MainContainer>
                <CardContainer>
                    <TopContainer>
                        <TopContainerHeading>Welcome Back to HelloMee!</TopContainerHeading>
                        <TopContainerText>
                            To keep connected with us please <br/>
                            login with your personal info
                        </TopContainerText>
                    </TopContainer>
                    <BottomContainer>
                        <AuthTabs />
                        <BottomContainerHeading>Sign in to HelloMee</BottomContainerHeading>
                        <FormContainer>
                            <InputFieldContainer>
                                <HiOutlineMail size={18} color='#4A4A4A' />
                                <InputBox type="text" placeholder="Email" />
                            </InputFieldContainer>
                            <InputFieldContainer>
                                <MdOutlineLock size={18} color='#4A4A4A' />
                                <InputBox type="password" placeholder="Password" />
                            </InputFieldContainer>
                            <SignInButton type="submit">SIGN IN</SignInButton>
                        </FormContainer>
                    </BottomContainer>
                </CardContainer>
            </MainContainer>
        )
    }
}

export default LoginRoute