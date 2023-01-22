import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Header } from '../Header'
import { Routes } from '../../Routes'
import { GlobalStyles } from '../../assets/styles/global'
import { defaultTheme } from '../../assets/styles/default'
import { Container } from './styles'
import { TotastContainer } from '../Toast/TotastContainer'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <TotastContainer />
        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}
