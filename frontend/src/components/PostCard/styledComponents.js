import styled from 'styled-components'

export const PostItemContainer = styled.div`
    border: 1px solid red;
`

export const PostHeader = styled.div`
    background-color: #1A1B29;
    padding: 14px;
`

export const PostDetailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
`

export const DetailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const ProfileContainer = styled.div`
    background-color:rgb(37, 77, 102);
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 8px;
    margin-right: 10px;
`

export const UsernameContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const Username = styled.p`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 20px;
    font-weight: 600;
`

export const PostedDate = styled.p`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 14px;
    font-weight: 500;
`

export const PostImage = styled.img`
    height: 350px;
    width: 100%;
    border: 5px solid blue;
`