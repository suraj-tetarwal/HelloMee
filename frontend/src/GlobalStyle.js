import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
	scrollbar-width: thin;
	scrollbar-color: transparent transparent;
    }

    body, html {
        background-color: #000000;
        margin: 0;
        padding: 0;
    }

    ::-webkit-scrollbar {
	width: 0px;
	height: 0px;
    }

    ::-webkit-scrollbar-thumb {
	background-color: transparent;
    }


    ::-webkit-scrollbar-track {
	background-color: transparent;
    }
`

export default GlobalStyle