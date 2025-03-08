import { Component } from 'react'

import {
    UserCardItem,
    PlaceholderProfile,
    UserIcon,
    UserInfoContainer,
    Username,
    Profession,
    Location,
} from './styledComponents'

const backgroundColorsArray = ['#6B7280', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#FACC15', '#A855F7']

class UserCard extends Component {
    generateRandomColor = () => {
        return backgroundColorsArray[Math.floor(Math.random() * backgroundColorsArray.length)]
    }

    render() {
        const {userDetails} = this.props
        const {profileUrl, username, profession, location} = userDetails
        const randomColor = this.generateRandomColor()
        return (
            <UserCardItem>
                {
                    profileUrl ? null : (
                        <PlaceholderProfile $bgColor={randomColor}>
                            <UserIcon />
                        </PlaceholderProfile>
                    )
                }
                <UserInfoContainer>
                    <Username>{username}</Username>
                    <Profession>{profession}</Profession>
                    <Location>{location}</Location>
                </UserInfoContainer>
            </UserCardItem>
        )
    }
}

export default UserCard 