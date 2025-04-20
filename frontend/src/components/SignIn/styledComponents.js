import styled from 'styled-components'

import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineLock } from "react-icons/md"
import { FaGoogle } from "react-icons/fa6"
import { FaFacebookF } from "react-icons/fa6"
import { FaLinkedinIn } from "react-icons/fa6"
import { GoTriangleRight } from "react-icons/go"

export const MainContainer = styled.div`
    background-color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;

    @media screen and (min-width: 768px) {
        height: 100vh;
        padding: 50px;
    }
`

export const CardContainer = styled.div`
    background-color: #0A0A0A;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    @media screen and (min-width: 768px) {
        height: 100vh;
        width: 90%;
        display: flex;
        flex-direction: row;
        border-radius: 10px;
        padding: 5px;
    }
`

export const MobileViewContainer = styled.div`
    @media screen and (min-width: 768px) {
        display: none;
    }
`

export const DesktopContainer = styled.div`
    display: none;

    @media screen and (min-width: 768px) {
        height: 100%;
        width: 40%;
        background-image: url('https://i.pinimg.com/736x/ec/63/49/ec6349719d522a68acf4ef371593e935.jpg');
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        transition: 1s ease-in-out;
        opacity: 0.5;
        padding: 20px;

        &:hover {
            font-family: Jura;
            transition: 1s ease-in-out;
            opacity: 1;
        }
    }
`

export const DesktopContainerHeading = styled.h1`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 36px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 12px;
`

export const DesktopContainerText = styled.p`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 16px;
`

export const SignInButton = styled.button`
    background-color: transparent;
    height: 40px;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #FFFFFF;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    padding-left: 24px;
    padding-right: 24px;
`

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LogoText = styled.h1`
    color: #FFFFFF;
    font-family: Montez;
    font-size: 32px;
    font-weight: 500;
`

export const SignInText = styled.h1`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 26px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 8px;
`

export const DescriptionText = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
`

export const AuthButtonContainer = styled.div`
    width: 100%;
    margin-top: 24px;
`
    
export const AuthButton = styled.button`
    height: 40px;
    width: 100%;
    background: linear-gradient(#007BFF, #0056B3);
    color: #EEEEEE;
    font-family: Jura;
    font-size: 20px;
    font-weight: 600;
    border: none;
    outline: none
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 2px 2px #000000;
    margin-bottom: 16px;
`

export const FormContainer = styled.div`
    width: 100%;

    @media screen and (min-width: 768px) {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 50px 0 50px;
    }
`

export const Form = styled.form`
    width: 100%;

    @media screen and (min-width: 768px) {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

export const FormHeading = styled.h1`
    display: none;

    @media screen and (min-width: 768px) {
        display: block;
        color: #FFFFFF;
        font-family: Jura;
        font-size: 36px;
        font-weight: 900;
        text-align: center;
        margin-bottom: 12px;
    }
`

export const FormText = styled.p`
    display: none;

    @media screen and (min-width: 768px) {
        display: block;
        color: #BDBDBD;
        font-family: Jura;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20px;
    }
`

export const DesktopAuthButtonContainer = styled.div`
    display: none;

    @media screen and (min-width: 768px) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 30%;
        margin-bottom: 16px;
    }
`

export const DesktopAuthButton = styled.button`
    background: linear-gradient(#007BFF, #0056B3);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    padding: 15px;
    box-shadow: 0 1px 1px #000000;
    margin-right: 16px;
`

export const GoogleIcon = styled(FaGoogle)`
	color: #FFFFFF;
	font-size: 24px;
`

export const FacebookIcon = styled(FaFacebookF)`
	color: #FFFFFF;
	font-size: 24px;
`

export const LinkedinIcon = styled(FaLinkedinIn)`
	color: #FFFFFF;
	font-size: 24px;
`

export const ShowPasswordContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;
    margin-bottom: 12px;
`

export const LabelText = styled.label`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 20px;
    font-weight: 500;
    margin-left: 10px;
`

export const CheckBox = styled.input`
    appearance: none;
    height: 20px;
    width: 20px;
    background-color: #1A1A1A;
    border: 1px solid #BDBDBD;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    position: relative;

    &:checked {
        background-color: #1A1A1A;
    }

    &:checked::after {
        content: "";
        position: absolute;
        top: -5px;
        width: 6px;
        height: 10px;
        border: solid #BDBDBD;
        border-width: 0 5px 5px 0;
        transform: rotate(45deg);
        transform-origin: bottom left;
    }
`

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #1A1A1A;
    border-radius: 6px;
    padding: 5px;
    margin-bottom: 14px;

    @media screen and (min-width: 768px) {
        width: 100%;
        margin-bottom: 20px;
    }
`

export const InputBox = styled.input`
    height: 40px;
    width: 100%;
    background-color: #1A1A1A;
    color: #BDBDBD;
    font-family: Jura;
    font-size: 18px;
    font-weight: 600;
    border: none;
    outline: none;
    border-radius: 6px;
    padding: 10px;
    box-shadow: none;

    @media screen and (min-width: 768px) {
        height: 50px;
        border: none;
    }
`

export const EmailIcon = styled(HiOutlineMail)`
	color: #007BFF;
	font-size: 28px;
`

export const PasswordIcon = styled(MdOutlineLock)`
	color: #007BFF;
	font-size: 28px;
`


export const ErrorMessage = styled.p`
    color: red;
    font-family: Jura;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 12px;
`

export const SubmitButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    background: linear-gradient(#007BFF, #0056B3);
    color: #EEEEEE;
    font-family: Jura;
    font-size: 20px;
    font-weight: 600;
    border: none;
    outline: none
    cursor: pointer;
    border-radius: 8px;
    margin-top: 12px;
    margin-bottom: 15px;
    box-shadow: 0 2px 2px #000000;

    @media screen and (min-width: 768px) {
        width: 30%;
        border-radius: 6px;
        cursor: pointer;
    }
`

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 12px;

    @media screen and (min-width: 768px) {
        display: none;
    }
`

export const ForgotYourPassword = styled.a`
        color: #FFFFFF;
        font-family: Jura;
        font-size: 20px;
        font-weight: 600;
        text-decoration: none;
        text-align: center;
        border-bottom: 2px solid #FFFFFF;
        margin-bottom: 15px;
    
        @media screen and (min-width: 768px) {
            padding: 2px;
            margin-bottom: 10px;
        }
`

export const MessageText = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
`

export const LinkButton = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    color: #007BFF;
    font-family: Jura;
    font-size: 20px;
    font-weight: 500;
    text-decoration: none;
`

export const DeveloperText = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    margin-top: 15px;
`