import {styled} from 'styled-components'

export const PostFeedContainer = styled.div`
    width: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media screen and (min-width: 768px) {
	min-width: 40%;
	flex-grow: 1; 
    }
`

export const PostListContainer = styled.ul`
    height: 100%;
    list-style-type: none;
    
    @media screen and (min-width: 768px) {
	overflow: auto;
    }
`

export const LoaderContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`

export const FailureViewContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ErrorMessage = styled.p`
    color: #D32F2F;
    font-family: Jura;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
`

export const RetryButton = styled.button`
    height: 40px;
    background-color: transparent;
    color: #BDBDBD;
    font-family: Jura;
    font-size: 16px;
    font-weight: 600;
    border: 2px solid #BDBDBD;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
`