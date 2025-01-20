import styled from 'styled-components'

export const MainContainer = styled.div`
    background-color: #1A1B29;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 50px;
    padding-right: 50px;

    @media screen and (min-width: 768px) {
        height: 100vh;
        padding: 50px;
    }
`

export const CardContainer = styled.div`
    background-color: #2A2B3D;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-shadow: 5px 5px 10px #000000;

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
        background-image: url('https://i.pinimg.com/736x/a7/57/b5/a757b508361929017c4804d04e1ad74c.jpg');
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        transition: 1s ease-in-out;
        opacity: 0.7;
        padding: 20px;

        &:hover {
            font-family: Jura;
            transition: 1s ease-in-out;
            opacity: 1;
        }
    }
`

export const DesktopContainerHeading = styled.h1`
    color: #EEEEEE;
    font-family: Jura;
    font-size: 36px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 12px;
`

export const DesktopContainerText = styled.p`
    color: #EEEEEE;
    font-family: Jura;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
`

export const SignInButton = styled.button`
    background-color: transparent;
    height: 40px;
    color: #EEEEEE;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #EEEEEE;
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
    color: #EEEEEE;
    font-family: Montez;
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 12px;
`

export const CreateAccountText = styled.h1`
    color: #EEEEEE;
    font-family: Jura;
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 20px;
`

export const DescriptionText = styled.p`
    color: #EEEEEE;
    font-family: Jura;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
`

export const AuthButtonContainer = styled.div`
    width: 100%;
    margin-top: 25px;
`
    
export const AuthButton = styled.button`
    height: 40px;
    width: 100%;
    background-color: #DB35CC;
    color: #EEEEEE;
    font-family: Jura;
    font-size: 20px;
    font-weight: 600;
    border: none;
    outline: none
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 2px 2px #000000;
    margin-bottom: 12px;
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
        color: #DB35CC;
        font-family: Jura;
        font-size: 36px;
        font-weight: bolder;
        text-align: center;
        margin-bottom: 12px;
    }
`

export const FormText = styled.p`
    display: none;

    @media screen and (min-width: 768px) {
        display: block;
        color: #EEEEEE;
        font-family: Jura;
        font-size: 18px;
        font-weight: 500;
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
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #DB35CC;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    padding: 15px;
    box-shadow: 0 1px 1px #000000;
`

export const ShowPasswordContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;
    margin-bottom: 12px;
`

export const LabelText = styled.label`
    color: #DB35CC;
    font-family: Jura;
    font-size: 20px;
    font-weight: 500;
    margin-left: 10px;
`

export const CheckBox = styled.input`
    appearance: none;
    height: 20px;
    width: 20px;
    background-color: #1A1B29;
    border: 1px solid #DB35CC;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    position: relative;

    &:checked {
        background-color: #1A1B29;
    }

    &:checked::after {
        content: "";
        position: absolute;
        top: -5px;
        width: 6px;
        height: 10px;
        border: solid #DB35CC;
        border-width: 0 5px 5px 0;
        transform: rotate(45deg);
        transform-origin: bottom left;
    }
`

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #1A1B29;
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
    background-color: #1A1B29;
    color: #DB35CC;
    font-family: Jura;
    font-size: 22px;
    font-weight: 500;
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

export const SubmitButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    background-color: #DB35CC;
    color: #EEEEEE;
    font-family: Jura;
    font-size: 20px;
    font-weight: 600;
    border: none;
    outline: none
    cursor: pointer;
    border-radius: 6px;
    margin-top: 10px;
    box-shadow: 0 2px 2px #000000;

    @media screen and (min-width: 768px) {
        width: 30%;
        border-radius: 6px;
    }
`

export const FooterContainer = styled.div`
    margin-top: 30px;

    @media screen and (min-width: 768px) {
        display: none;
    }
`

export const MessageText = styled.p`
    color: #EEEEEE;
    font-family: Jura;
    font-size: 20px;
    font-weight: 500;
`

export const Link = styled.a`
    color: #DB35CC;
    font-family: Jura;
    font-size: 22px;
    font-weight: 500;
    text-decoration: none;
`

export const DeveloperText = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    margin-top: 24px;
`