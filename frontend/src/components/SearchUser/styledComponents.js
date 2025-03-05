import { IoSearch } from 'react-icons/io5'
import styled from 'styled-components'

export const SearchUserContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const SearchSection = styled.div`
    height: 100vh;
    padding: 16px;
`

export const SearchForm = styled.form`
    background-color: rgba(30, 30, 30, 0.5);
    border-radius: 4px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #BDBDBD;
    padding: 8px;
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

export const SearchButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SearchIcon = styled(IoSearch)`
    color: #E0E0E0;
    font-size: 20px;
    margin-right: 8px;
` 

export const SearchResultContainer = styled.div`
    height: 100%;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Placeholder = styled.p`
    color: red;
    font-family: Jura;
    font-size: 32px;
    font-weight: 700;
`