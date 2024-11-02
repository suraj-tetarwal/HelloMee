import styled from 'styled-components'

export const MainContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
`

export const CardContainer = styled.div`
    width: 70%;
    box-shadow: 0 4px 10px #000000;
    border-radius: 10px;
`

export const TopContainer = styled.div`
    background-color: #D94E3D;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

export const TopContainerHeading = styled.h1`
    color: #FFFFFF;
    font-family: Roboto;
    font-size: 30px;
    font-weight: 500;
    align-self: flex-start;
    margin-bottom: 0;
`

export const TopContainerText = styled.p`
    color: #FFFFFF;
    font-family: Roboto;
    font-size: 18px;
    align-self: flex-start;
    margin-bottom: 0;
`

export const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 20px;
`

export const BottomContainerHeading = styled.h1`
    color: #D94E3D;
    font-family: Roboto;
    font-size: 30px;
    font-weight: 600;
    margin-top: 0;
`

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const InputFieldContainer = styled.div`
    height: 30px;
    width: 80%;
    background-color: #E0E0E0;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 15px;
`

export const InputBox = styled.input`
    height: 30px;
    background-color: transparent;
    color: #4A4A4A;
    font-family: Roboto;
    font-size: 16px;
    border: none;
    outline: none;
    margin-left: 10px;
`

export const SignInButton = styled.button`
    background-color: #F55D3E;
    color: #FFFFFF;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justif-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 8px #333333;
    outline: none;
    cursor: pointer;
    padding: 14px 20px 14px 20px;
    margin-top: 10px;
`