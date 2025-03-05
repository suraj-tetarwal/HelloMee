import {
    PostContainer,
    PostHeader,
    ProfileContainer,
    ProfilePlaceholder,
    UserIcon,
    UserInfo,
    Username,
    PostTime,
    MenuIcon,
    PostContent,
    CaptionText,
    MediaContainer,
    PlaceholderString,
    PostFooter,
    PostActionContainer,
    LikeCommentIconContainer,
    LikeIcon,
    CommentIcon,
    ShareIcon,
    BookmarkIcon,
    PostMetaContainer,
    PostMetaText,
} from './styledComponents'

const PostCard = props => {
    const {postDetails} = props
    const {username, profileUrl, caption, mediaUrl, likesCount, commentsCount, createdAt} = postDetails

    const timeAgo = (date) => {
        const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
        const intervals = { year: 31536000, month: 2592000, week: 604800, day: 86400, hour: 3600, minute: 60 };
        
        for (let unit in intervals) {
            let count = Math.floor(seconds / intervals[unit]);
            if (count >= 1) return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
        }
    
        return "Just now";
    }

    return (
        <PostContainer>
            <PostHeader>
                <ProfileContainer>
                    <ProfilePlaceholder>
                        <UserIcon />
                    </ProfilePlaceholder>    
                    <UserInfo>
                        <Username>{username}</Username>
                        <PostTime>{timeAgo(createdAt)}</PostTime>
                    </UserInfo>
                </ProfileContainer>
                <MenuIcon />
            </PostHeader>
            <PostContent>
                <CaptionText>{caption}</CaptionText>
                <MediaContainer>
                    <PlaceholderString>{mediaUrl}</PlaceholderString>
                </MediaContainer>
            </PostContent>
            <PostFooter>
                <PostActionContainer>
                    <LikeCommentIconContainer>
                        <LikeIcon />
                        <CommentIcon />
                        <ShareIcon />
                    </LikeCommentIconContainer>
                    <BookmarkIcon />
                </PostActionContainer>
                <PostMetaContainer>
                    <PostMetaText>
                        {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                    </PostMetaText>
                    <PostMetaText>
                        {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
                    </PostMetaText>
                </PostMetaContainer>
            </PostFooter>
        </PostContainer>
    )
}

export default PostCard