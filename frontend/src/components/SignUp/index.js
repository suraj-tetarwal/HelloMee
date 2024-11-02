import {Component} from 'react'

import { AiOutlineUser } from "react-icons/ai"
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
    SignUpButton,
} from './styledComponents'

// import './index.css'

class TestLogin extends Component {
    // renderTabs = () => (
    //     <ul className="list-container">
    //         <li className={false ? `active-tab-item` : `tab-item`}>Sign up</li>
    //         <li className={true ? `active-tab-item` : `tab-item`}>Sign in</li>
    //     </ul>
    // )

    render() {
        return (
            <MainContainer>
                <CardContainer>
                    <TopContainer>
                        <TopContainerHeading>Hello, Friend!</TopContainerHeading>
                        <TopContainerText>
                            Enter your personal details <br />
                            and start journey with us.
                        </TopContainerText>
                    </TopContainer>
                    <BottomContainer>
                        <AuthTabs />
                        <BottomContainerHeading>Create Account</BottomContainerHeading>
                        <FormContainer>
                            <InputFieldContainer>
                                <AiOutlineUser size={18} color='#4A4A4A' />
                                <InputBox type="text" placeholder="Name" />
                            </InputFieldContainer>
                            <InputFieldContainer>
                                <HiOutlineMail size={18} color='#4A4A4A' />
                                <InputBox type="text" placeholder="E-mail" />
                            </InputFieldContainer>
                            <InputFieldContainer>
                                <MdOutlineLock size={18} color='#4A4A4A' />
                                <InputBox type="password" placeholder="Password" />
                            </InputFieldContainer>
                            <SignUpButton type="submit">SIGN UP</SignUpButton>
                        </FormContainer>
                    </BottomContainer>
                </CardContainer>
            </MainContainer>
        )
    }
}

export default TestLogin