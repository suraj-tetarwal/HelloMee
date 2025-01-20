import { FaUser } from "react-icons/fa6"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi"

import {
    PostItemContainer,
    PostHeader,
    PostDetailsContainer,
    DetailsContainer,
    ProfileContainer,
    UsernameContainer,
    Username,
    PostedDate,
    PostImage,
} from './styledComponents'

const PostCard = () => {
    return (
        <PostItemContainer>
            <PostHeader>
                <PostDetailsContainer>
                    <DetailsContainer>
                        <ProfileContainer>
                            <FaUser color="#FFFFFF" size="20px" />
                        </ProfileContainer>
                        <UsernameContainer>
                            <Username>LordSkte</Username>
                            <PostedDate>16 Septemer 2024</PostedDate>
                        </UsernameContainer>
                    </DetailsContainer>
                    <PiDotsThreeOutlineVerticalFill color="#FFFFFF" size="30px" />
                </PostDetailsContainer>
            </PostHeader>
            <PostImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSukY5XYsscljTwsgp0BjMWMqV1PZ7BOdqcXacqS5W30pz2jNQj42x2wIdAbCi0JSlC3_4&usqp=CAU" alt="post image" />
        </PostItemContainer>
    )
}

export default PostCard