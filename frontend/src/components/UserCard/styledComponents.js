import styled from 'styled-components'
import { FaUser } from 'react-icons/fa'

export const UserCardItem = styled.li`
    background-color: #131314;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 8px;
`

export const PlaceholderProfile = styled.div`
    background-color: ${props => props.$bgColor};
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
`

export const UserIcon = styled(FaUser)`
    color: #FFFFFF;
    font-size: 24px;
`

export const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const Username = styled.p`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 24px;
    font-weight: 600;
`

export const Profession = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
`

export const Location = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 14px;
    font-weight: 500;
`