import {Component} from 'react'

import Header from '../Header'
import BottomNavbar from '../BottomNavbar'

import {
    SearchUserContainer,
    SearchSection,
    SearchForm,
    SearchInput,
    SearchButton,
    SearchIcon,
    SearchResultContainer,
    Placeholder,
} from './styledComponents'

class SearchUser extends Component {
    render() {
        return (
            <SearchUserContainer>
                <Header />
                <SearchSection>
                    <SearchForm>
                        <SearchButton type="submit">
                            <SearchIcon />
                        </SearchButton>
                        <SearchInput type="search" placeholder="Type a username to search" />
                    </SearchForm>
                    <SearchResultContainer>
                        <img src="\assets\illustrations\user-search.svg" alt="search illustration" />
                        <Placeholder>Search Results will appear here</Placeholder>
                    </SearchResultContainer>
                </SearchSection>
                <BottomNavbar />
            </SearchUserContainer>
        )
    }
}

export default SearchUser