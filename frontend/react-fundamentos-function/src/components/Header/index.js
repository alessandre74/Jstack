import React from 'react'
import { useHistory } from 'react-router-dom'

import { Container } from './styles'

export default function Header() {
  const history = useHistory()

  function handleNavigate() {
    history.push('/')
  }

  return (
    <Container>
      <h1>JStack's Blog</h1>
      <button onClick={handleNavigate} style={{ color: '#fff' }}>
        Voltar para a home
      </button>
      <button type="button">🌞</button>
    </Container>
  )
}
