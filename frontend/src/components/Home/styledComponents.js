import styled from 'styled-components'

export const HomeContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
 

    @media screen and (min-width: 768px) {
	display: flex;
	flex-direction: row;
	height: 100vh;
    }
`