import { Component } from 'react'

import Header from '../Header'
import BottomNavbar from '../BottomNavbar'

import {
    NotificationFeedContainer,
    NotificationsSection,
    NotificationsHeading,
    NotificationsList,
    PlaceholderText,
} from './styledComponents'

class NotificationFeed extends Component {
    render() {
        return (
            <NotificationFeedContainer>
                <Header />
                <NotificationsSection>
                    <NotificationsHeading>Notification</NotificationsHeading>
                    <NotificationsList>
                        <PlaceholderText>
                            No notifications yet! Stay tuned for updates.
                        </PlaceholderText>
                    </NotificationsList>
                </NotificationsSection>
                <BottomNavbar />
            </NotificationFeedContainer>
        )
    }
}

export default NotificationFeed