import styled from 'styled-components'

import { FaUser, FaLink, FaBriefcase } from "react-icons/fa"
import { IoRefresh, IoCrop } from 'react-icons/io5'
import { MdLocationPin } from 'react-icons/md'

export const MainContainer = styled.div`
    background-color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
`

export const CardContainer = styled.div`
    background-color: #0A0A0A;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-shadow: 5px 5px 10px #000000;
`

export const CreateProfileHeading = styled.h1`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 28px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 16px;
`

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ProfileImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ImageContainer = styled.div`
    background-color: #000000;
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 5px;
    margin-bottom: 20px;
`

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    padding: 5px;
`

export const ProfileImage = styled.img`
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 50%;
`

export const UploadImageButton = styled.button`
    background: linear-gradient(#007BFF, #0056B3);
    height: 40px;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 600;
    border: none;
    outline: none;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
`

export const PopupContainer = styled.div`
    background-color: #00000080;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 1;
    overflow-y: auto;
    padding: 28px;
`

export const ContentContainer = styled.div`
    background-color: #1A1A1A;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-radius: 10px;
    padding: 24px;
    overflow: auto;
`

export const CloseButton = styled.div`
    background-color: transparent;    
    color: #FFFFFF;
    font-size: 24px;
    font-weight: bolder;
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    outline: none;
    cursor: pointer;
`

export const SelectImageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SelectImageButton = styled.button`
    background-color: transparent;
    min-height: 40px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #FFFFFF;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    padding: 12px;
    margin-bottom: 24px;
`

export const LabelText = styled.label`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
`

export const FileInputElement = styled.input`
    display: none;
`

export const PreviewSection = styled.div`
    height: 100px;
    width: 100px;
    border: 2px dashed #808080;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`

export const Placeholder = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
`

export const PreviewImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
`

export const CropperSection = styled.div`
    height: 100%;
    width: 100%;
    border: 2px dashed #808080;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 10px;
`

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
`

export const ActionButtonContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const CropButton = styled.button`
    background: linear-gradient(#007BFF, #0056B3);
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 12px;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0px 4px 2px #000000;
    padding: 12px;
`

export const CropIcon = styled(IoCrop)`
	color: #FFFFFF;
	font-size: 24px;
`

export const DoneButton = styled.div`
    background: linear-gradient(#00C853, #009624);
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0px 4px 2px #000000;
    padding: 12px;
`

export const ResetButton = styled.button`
    background: linear-gradient(#E63946, #B22222);
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 12px;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0px 4px 2px #000000;
    padding: 12px;
`

export const ResetIcon = styled(IoRefresh)`
	color: #FFFFFF;
	font-size: 24px;
`

export const ProfileDetailContainer = styled.div`    display: flex;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`

export const DetailGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    overflow-x: auto;
`

export const DetailGroupHeading = styled.h1`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
`

export const InfoText = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px
`

export const Label = styled.span`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 18px;
    font-weight: 500;
    margin-right: 8px;
`

export const Value = styled.span`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 18px;
    font-weight: 500;
`

export const InputField = styled.input`
    background-color: #1A1A1A;
    height: 40px;
    width: 100%;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    outline: none;
    padding: 8px;
    margin-bottom: 16px;
`

export const UserIcon = styled(FaUser)`
	color: #007BFF;
	font-size: 24px;
`

export const BriefCaseIcon = styled(FaBriefcase)`
	color: #007BFF;
	font-size: 24px;
`

export const LinkIcon = styled(FaLink)`
	color: #007BFF;
	font-size: 24px;
`

export const LocationIcon = styled(MdLocationPin)`
	color: #007BFF;
	font-size: 24px;
`

export const BioContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const BioTextarea = styled.textarea`
    background-color: #1A1A1A;
    min-height: 100px;
    width: 100%;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    outline: none;
    padding: 8px;
    margin-bottom: 8px;
`

export const BioCharCount = styled.p`
    color: #BDBDBD;
    font-family: Jura;
    font-size: 16px;
    font-weight: 600;
    align-self: flex-start; 
`

export const ProfileActionButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin-top: 8px;
    margin-bottom: 16px;
`

export const SkipButton = styled.button`
    min-height: 40px;
    background: linear-gradient(#007BFF, #0056B3);
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    flex-grow: 1;
`

export const SaveButton = styled.button`
    min-height: 40px;
    background: linear-gradient(#00C853, #009624);
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    flex-grow: 1;
`