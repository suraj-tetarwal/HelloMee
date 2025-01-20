import styled from 'styled-components'

export const HeaderContainer = styled.div`
    position: fixed;
    height: 70px;
    width: 100%;
    background-color: #1A1B29;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
`

export const UserProfile = styled.div`
    height: 40px;
    width: 40px;
    background-color: #DB35CC;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 5px;
`

export const LogoText = styled.h1`
    color: #FFFFFF;
    font-family: Montez;
    font-size: 30px;
    font-weight: 500;
    transition: all 1.5s ease;

    &:hover {
        color: #DB35CC;
        transition: all 1.5s ease;
    }
`
