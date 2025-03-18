import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { IoChatbubbleOutline, IoBookmarkOutline } from 'react-icons/io5'
import { AiOutlineFire, AiOutlineShareAlt } from 'react-icons/ai'
import styled from 'styled-components'

export const PostContainer = styled.li`
    background-color: #000000;
    border-bottom: 3px solid #808080;
`

export const PostHeader = styled.div`
    background-color: #000000;
    padding: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #808080;
`

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const ProfilePlaceholder = styled.div`
background-color: #DB35CC;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 8px;
`

export const UserIcon = styled(FaUser)`
    color: #FFFFFF;
    font-size: 20px;
`

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`

export const Username = styled.span`
    color: #EEEEEE;
    font-family: Jura;
    font-size: 18px;
    font-weight: 900;
`

export const PostTime = styled.span`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 14px;
    font-weight: 500;
`

export const MenuIcon = styled(BsThreeDotsVertical)`
    color: #FFFFFF;
    font-size: 24px;
    cursor: pointer;
`

export const PostContent = styled.div`
    margin: 16px;
`

export const CaptionText = styled.p`
    color: #EEEEEE;
    font-family: Jura;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
`

export const MediaContainer = styled.div`
    background-color: #1A1A1A;
    height: 60vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`

export const PlaceholderString = styled.span`
    color: #EEEEEE;
    font-family: Jura;
    font-size: 12px;
    font-weight: 500;
`

export const PostFooter = styled.div`
    background-color: #000000;
    padding: 12px;
    border-top: 1px solid #808080;
`

export const PostActionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const LikeCommentIconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const LikeIcon = styled(AiOutlineFire)`
    color: #FFFFFF;
    font-size: 24px;
    margin-right: 16px;
`

export const CommentIcon = styled(IoChatbubbleOutline)`
    color: #FFFFFF;
    font-size: 24px;
    margin-right: 16px;
`

export const ShareIcon = styled(AiOutlineShareAlt)`
    color: #FFFFFF;
    font-size: 24px;
`

export const BookmarkIcon = styled(IoBookmarkOutline)`
    color: #FFFFFF;
    font-size: 24px;
`

export const PostMetaContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    margin-top: 8px
`

export const PostMetaText = styled.span`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500
`