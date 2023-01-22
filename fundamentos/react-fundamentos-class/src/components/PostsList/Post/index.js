import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function Post({ title, description }) {
  return (
    <Container>
      <h2>{title}</h2>
      <small>{description}</small>
    </Container>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}
