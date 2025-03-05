import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, html {
        background-color: #0A0A0A;
        margin: 0;
        padding: 0;
    }
`

export default GlobalStyle