import styled from 'styled-components'

export const MainContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
`

export const FormContainer = styled.form`
    width: 100%;
    background-color: #E9E9E9;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    box-shadow: 0 4px 10px #000000;
`

export const Heading = styled.h1`
    color: #F55D3E;
    font-family: Roboto;
    font-size: 30px;
    font-weight: 600;
`

export const FieldContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`

export const LabelText = styled.label`
    color: #F55D3E;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 2px;
`

export const Input = styled.input`
    height: 20px;
    width: 100%;
    background-color: #FFFFFF;
    color: #4A4A4A;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #D9D9D9;
    outline: none;
    padding: 10px;
`

export const SignUpButton = styled.button`
    background-color: #F55D3E;
    color: #FFFFFF;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    padding: 10px 20px 10px 20px;
    margin-top: 20px;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.4s ease;

    &:hover {
        background-color: #D94E3D;
        color: #FFD59E;
        transform: scale(1.05);
    }
`
