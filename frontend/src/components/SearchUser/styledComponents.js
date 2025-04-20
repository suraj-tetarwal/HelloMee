import { IoSearch } from 'react-icons/io5'
import styled from 'styled-components'

export const SearchUserContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    @media screen and (min-width: 768px) {
	flex-direction: row;
	height: 100%;
    }
`

export const SearchSection = styled.div`
    background-color: #000000;
    height: 100%;
    padding: 16px;

    @media screen and (min-width: 768px) {
	height: 100vh;
	width: 40%;
	padding: 32px;
	overflow: auto;
    }
`

export const SearchInputContainer = styled.div`
    background-color: #0A0A0A;
    border-radius: 4px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #BDBDBD;
    padding: 8px;
    margin-bottom: 16px;

    @media screen and (min-width: 768px) {
	height: 60px;
    }
` 

export const SearchInput = styled.input`
    background-color: transparent;
    height: 40px;
    width: 100%;
    color: #E0E0E0;
    font-family: Jura;
    font-size: 18px;
    font-weight: 600;
    border: none;
    border-radius: 16px;
    outline: none;
    flex-grow: 1;
`

export const SearchIcon = styled(IoSearch)`
    color: #E0E0E0;
    font-size: 20px;
    margin-right: 8px;
` 

export const SearchResultContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
`

export const PlaceholderText = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
`

export const LoaderContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const UserCardContainer = styled.ul`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
`

export const FailureResultContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const RetryButton = styled.button`
    height: 40px;
    background-color: transparent;
    border: 1px solid #FFFFFF;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
    margin-top: 16px;
`

