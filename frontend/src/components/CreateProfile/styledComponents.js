import styled from 'styled-components'

export const MainContainer = styled.div`
    background-color: #1A1B29;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
`

export const CardContainer = styled.div`
    background-color: #2A2B3D;
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
    font-size: 26px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 20px;
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
    background-color: transparent;
    height: 40px;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    border: 2px solid #FFFFFF;
    outline: none;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
`

export const PopupContainer = styled.div`
    background-color: #00000050;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 999;
`

export const ContentContainer = styled.div`
    background-color: #5B5858;
    height: 80vh;
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 10px 30px #000000;
    padding: 20px;
    margin-top: 20px;
    overflow: auto;
`

export const CloseButton = styled.div`
    background-color: transparent;    
    color: #000000;
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
    border: 2px solid #E0DFDF;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    margin-bottom: 10px;
`

export const LabelText = styled.label`
    color: #E0DFDF;
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
    border: 2px dashed #A8A6A6;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`

export const Placeholder = styled.p`
    color: #E0DFDF;
    font-family: Jura;
    font-size: 8px;
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
    border: 2px dashed #A8A6A6;
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
    background-color: #2196F3;
    min-height: 40px;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0px 4px 2px #000000;
    padding: 10px;
`

export const DoneButton = styled.div`
    background-color: #2B5D2B;
    min-height: 40px;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #E0DFDF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0px 4px 2px #000000;
    padding: 10px;
`

export const ResetButton = styled.button`
    background-color: #F44336;
    min-height: 40px;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0px 4px 2px #000000;
    padding: 10px;
`

export const ProfileDetailContainer = styled.div`    display: flex;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
`

export const DetailGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
`

export const DetailGroupHeading = styled.h1`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
`

export const InfoText = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px
`

export const Label = styled.span`
    color: #E8E8E8;
    font-family: Jura;
    font-size: 18px;
    font-weight: 500;
    margin-right: 8px;
`

export const Value = styled.span`
    color: #A0A0A0;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
`

export const PasswordContainer = styled.div`
    background-color: #1A1B29;
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-itesm: center;
    border-radius: 6px;
    padding-right: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
`

export const PasswordToggleButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
`

export const FieldContainer = styled.div`
    background-color: #1A1B29;
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 6px;
    padding-left: 8px;
    margin-bottom: 8px;
`

export const InputField = styled.input`
    background-color: #1A1B29;
    height: 40px;
    width: 100%;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    outline: none;
    padding: 8px;
`

export const BioContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const BioTextarea = styled.textarea`
    background-color: #1A1B29;
    min-height: 100px;
    width: 100%;
    color: #FFFFFF;
    font-family: Jura;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    outline: none;
    padding: 8px;
    margin-bottom: 8px;
`

export const BioCharCount = styled.p`
    color: #FFFFFF;
    font-family: Jura;
    font-size: 14px;
    font-weight: 500;
    align-self: flex-start; 
`