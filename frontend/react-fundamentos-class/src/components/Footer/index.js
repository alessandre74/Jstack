import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Container } from './styles'

export default function Footer() {
  const { theme, handleTogleTheme } = useContext(ThemeContext)

  return (
    <Container>
      <span>JStack's Blog. Todos os direitos reservados.</span>
      <button type="button" onClick={handleTogleTheme}>
        {theme === 'dark' ? '🌞' : '🌚'}
      </button>
    </Container>
  )
}
