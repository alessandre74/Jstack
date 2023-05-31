import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
${css`
  body {
    background: ${({ theme }) => theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    font-family: sans-serif;
  }
`}

`
