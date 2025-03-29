import styled from 'styled-components'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { IoChatbubbleOutline, IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import { AiFillFire, AiOutlineFire, AiOutlineShareAlt } from 'react-icons/ai'
import { BiSolidSend } from 'react-icons/bi'

export const PostContainer = styled.li`
    background-color: #000000;
    border-bottom: 5px solid #0A0A0A;
`

export const PostHeader = styled.div`
    background-color: #000000;
    padding: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1A1A1A;
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

export const Media = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 8px;
`

export const PostFooter = styled.div`
    background-color: #000000;
    padding: 12px;
    border-top: 1px solid #1A1A1A;
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

export const ActionButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    margin-right: 16px;
`

export const NonActiveLikeIcon = styled(AiOutlineFire)`
    color: #FFFFFF;
    font-size: 26px;
`

export const ActiveLikeIcon = styled(AiFillFire)`
    color: #FF0000;
    font-size: 26px;
`

export const CommentIcon = styled(IoChatbubbleOutline)`
    color: #FFFFFF;
    font-size: 26px;
`

export const ShareIcon = styled(AiOutlineShareAlt)`
    color: #FFFFFF;
    font-size: 26px;
`

export const NonActiveBookmarkIcon = styled(IoBookmarkOutline)`
    color: #FFFFFF;
    font-size: 26px;
`

export const ActiveBookmarkIcon = styled(IoBookmark)`
    color: #007BFF;
    font-size: 26px;
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

export const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
`

export const CommentFormContainer = styled.form`
    background-color: #0A0A0A;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 8px;
`

export const CommentInput = styled.textarea`
    background-color: #0A0A0A;
    color: #BDBDBD;
    font-family: Jura;
    font-size: 18px;
    font-weight: 600;
    border: none;
    outline: none;
    flex-grow: 1;
`

export const CommentSubmitButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
`

export const SendIcon = styled(BiSolidSend)`
    color: #FFFFFF;
    font-size: 26px;
`

export const CommentsListContainer = styled.ul`
    background-color: #0A0A0A;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    overflow-y: auto;
    padding: 8px;
`

export const CommentItemContainer = styled.li`
    color: #FFFFFF;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
`

export const CommentInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const CommentMetaDataContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const CommentUsername = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 16px;
    font-weight: 600;
    margin-right: 16px;
`

export const CommentTime = styled.p`
    color: #808080;
    font-family: Jura;
    font-size: 14px;
    font-weight: 600;
`

export const CommentText = styled.p`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 600;
`