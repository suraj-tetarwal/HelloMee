import styled from 'styled-components'

export const HeaderContainer = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(10, 10, 10, 0.5);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 0.5px solid #BDBDBD;
    backdrop-filter: blur(10px);

    @media screen and (min-width: 768px) {
	display: none;
    }
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

export const LogoutButton = styled.button`
    background-color: transparent;
    height: 40px;
    color: #E63946;
    font-family: Jura;
    font-size: 14px;
    font-weight: 500;
    border: 2px solid #E63946;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    padding-left: 8px;
    padding-right: 8px;
`