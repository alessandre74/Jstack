import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Title } from '../../components'
import { ThemeContext } from '../../context/ThemeContext'

export function Header(props) {
  const { onToggleTheme } = useContext(ThemeContext)

  return (
    <div>
      <Title>{props.title}</Title>
      <Button onClick={onToggleTheme}>Mudar tema</Button>
      {props.children}
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

Header.defaultProps = {
  title: `JStack's Blog`
}
