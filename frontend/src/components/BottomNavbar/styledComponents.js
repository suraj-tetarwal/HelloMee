import styled from 'styled-components'

export const BottomNavContainer = styled.div`
    background: rgba(10, 10, 10, 0.5);
    position: sticky;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #BDBDBD;
    backdrop-filter: blur(10px);
    padding: 12px;
    z-index: 100;
`

export const NavList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
`

export const NavButton = styled.button`
    background-color: transparent;
    color: ${(props) => (props.active === "true" ? "#33A8FF" : "#FFFFFF")};
    font-size: 30px;
    font-weight: 900;
    border: none;
    outline: none;
    cursor: pointer;
    filter: ${(props) => (props.active === "true" ? "drop-shadow(0px 0px 1px #0095F6)" : "drop-shadow(0px 0px 1px #FFFFFF)")}
`

export const NavItem = styled.li`
    color: #FFFFFF;
`