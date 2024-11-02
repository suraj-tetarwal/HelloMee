import styled from 'styled-components'

export const ListContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
    margin-top: 10px;
    margin-bottom: 20px;
`

export const TabItem = styled.button`
    width: 50%;
    color: #ffffff;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    background-color: ${({active}) => active ? '#F55D3E' : '#FFB86C'};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    padding: 12px;
`