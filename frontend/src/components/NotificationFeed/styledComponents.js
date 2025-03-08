import styled from 'styled-components'

export const NotificationFeedContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
` 

export const NotificationsSection = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow: hidden;
`

export const NotificationsHeading = styled.h1`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 28px;
    font-weight: 500;
    text-align: center;
`

export const NotificationsList = styled.ul`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
`

export const PlaceholderText = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
`