import {Component} from 'react'

import {
    MainContainer,
    FormContainer,
    Heading,
    FieldContainer,
    LabelText,
    Input,
    SignUpButton,
} from './styledComponents'

class LoginRoute extends Component {
    render() {
        return (
            <MainContainer>
                <FormContainer>
                    <Heading>Sign up</Heading>
                    <FieldContainer>
                        <LabelText>Username</LabelText>
                        <Input type="text" placeholder="Enter a Username" />
                    </FieldContainer>
                    <FieldContainer>
                        <LabelText>Password</LabelText>
                        <Input type="password" placeholder="Enter a Password" />
                    </FieldContainer>
                    <SignUpButton type="submit">Signup</SignUpButton>
                </FormContainer>
            </MainContainer>
        )
    }
}

export default LoginRoute