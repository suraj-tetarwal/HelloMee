import {Component}  from 'react'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'

import { BsSearch } from "react-icons/bs"

import UserCard from '../UserCard'

import './index.css'

class SearchUsers extends Component {
    state = {
        usersList: [],
        searchInput: ""
    }

    intervalId = null

    onChangeSearchInput = (event) => {
        const searchInput = event.target.value
        this.setState({searchInput})

        if (this.intervalId) {
            clearInterval(this.intervalId)
        }

        if (searchInput.trim().length < 2) {
            this.setState({usersList: []})
            return
        }

        setTimeout(() => {
            this.fetchUsers(searchInput)
        }, 500)
    }

    fetchUsers = async searchText => {
        try {
            const jwtToken = Cookies.get("jwtToken")

            const url = `https://hellomee-1.onrender.com/search?search_query=${searchText}`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                const {usersList} = data
                this.setState({usersList})
            } else {
                const {error} = data
                toast.error(error)
            }
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
    }

    render() {
        const {usersList, searchInput} = this.state
        return (
            <div className="search-user-component-container">
                <div className="search-input-container">
                    <BsSearch className="search-icon" />
                    <input 
                        type="search" 
                        value={searchInput}
                        onChange={this.onChangeSearchInput}
                        placeholder='Search by name or username' 
                        className="search-input-box"
                    />
                </div>
                {
                    usersList.length === 0 ? (
                        <h1 className="no-user-found-text">Nothing to show</h1>
                    ) : (
                        <ul className="users-list-container">
                            {
                                usersList.map(eachUser => (
                                    <UserCard userData={eachUser} key={eachUser.id} />
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        )
    }
}

export default SearchUsers