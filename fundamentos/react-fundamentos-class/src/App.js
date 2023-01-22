import React, { Component } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import Layout from './components/Layout'
import { ThemeProvider, ThemeContext } from './context/ThemeContext'

import { GlobalStyle } from './styles'
import { themes } from './styles'

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => (
            <StyledThemeProvider theme={themes[theme] || themes.dark}>
              <GlobalStyle />
              <Layout />
            </StyledThemeProvider>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    )
  }
}

export default App
