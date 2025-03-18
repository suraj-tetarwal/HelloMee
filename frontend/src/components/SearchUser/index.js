import {Component} from 'react'
import Cookies from 'js-cookie'
import { Oval } from 'react-loader-spinner'

import Header from '../Header'
import BottomNavbar from '../BottomNavbar'
import UserCard from '../UserCard'

import {
    SearchUserContainer,
    SearchSection,
    SearchInputContainer,
    SearchInput,
    SearchIcon,
    SearchResultContainer,
    PlaceholderText,
    LoaderContainer,
    UserCardContainer,
    FailureResultContainer,
    RetryButton,
} from './styledComponents'

const searchStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
    noResult: 'NO_RESULT',
}

class SearchUser extends Component {
    state = {
        query: '',
        usersList: [],
        timer: null,
        searchStatus: searchStatusConstants.initial,
    }

    onChangeSearchInput = event => {
        const searchInput = event.target.value
        const {timer} = this.state

        if (timer) {
            clearTimeout(timer)
        }

        const newTimer = setTimeout(() => {
            this.fetchUsers(searchInput)
        }, 300)

        this.setState({query: searchInput, timer: newTimer})
    }

    fetchUsers = async (query) => {
        const trimmedQuery = query.trim()
        const jwtToken = Cookies.get('jwt_token')

        if (trimmedQuery === "") {
            this.setState({usersList: [], searchStatus: searchStatusConstants.initial})
            return
        }

        this.setState({searchStatus: searchStatusConstants.inProgress})

        const url = `http://localhost:5000/search?query=${trimmedQuery}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json()
            if (data.length === 0) {
                this.setState({usersList: [], searchStatus: searchStatusConstants.noResult})
                return
            } else {
                this.setState({usersList: data, searchStatus: searchStatusConstants.success})
            }
        }
        else {
            this.setState({searchStatus: searchStatusConstants.failure})
        }

    }

    renderInitialView = () => {
        return (
            <SearchResultContainer>
                <PlaceholderText>Search results will appear here</PlaceholderText>
            </SearchResultContainer>
        )
    }

    renderLoader = () => {
        return (
            <LoaderContainer>
                <Oval color="#FFFFFF" secondaryColor="#CCCCCC" strokeWidth={5} height="50" width="50" />
            </LoaderContainer>
        )
    }

    renderEmptyListView = () => {
        return (
            <SearchResultContainer>
                <PlaceholderText>No user found</PlaceholderText>
            </SearchResultContainer>
        )
    }

    renderUsersCard = () => {
        const {usersList} = this.state
        return (
            <UserCardContainer>
                {
                    usersList.map((eachUser) => (
                        <UserCard userDetails={eachUser} key={eachUser._id} />
                    ))
                }
            </UserCardContainer>
        )
    }

    renderFailureView = () => {
        const {query} = this.state
        return (
            <FailureResultContainer>
                <PlaceholderText>Something went wrong. Please try again.</PlaceholderText>
                <RetryButton type="button" onClick={() => this.fetchUsers(query)}>Try Again</RetryButton>
            </FailureResultContainer>
        )
    }

    renderSearchResults = () => {
        const {searchStatus} = this.state
        switch (searchStatus) {
            case searchStatusConstants.inProgress:
                return this.renderLoader()
            case searchStatusConstants.success:
                return this.renderUsersCard()
            case searchStatusConstants.failure:
                return this.renderFailureView()
            case searchStatusConstants.noResult:
                return this.renderEmptyListView()
            default:
                return this.renderInitialView()
        }
    }

    render() {
        const {query} = this.state 
        return (
            <SearchUserContainer>
                <Header />
                <SearchSection>
                    <SearchInputContainer>
                        <SearchIcon />
                        <SearchInput 
                            type="search" 
                            value={query}
                            placeholder="Type a username to search"
                            onChange={this.onChangeSearchInput}
                         />
                    </SearchInputContainer>
                    {this.renderSearchResults()}
                </SearchSection>
                <BottomNavbar />
            </SearchUserContainer>
        )
    }
}

export default SearchUser