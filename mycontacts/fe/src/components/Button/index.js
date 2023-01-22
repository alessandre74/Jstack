import PropTypes from 'prop-types'
import { Spinner } from '../Spinner'
import { StyledButton } from './styles'

export function Button({ type, disabled, isLoading, children }) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      {!isLoading && children}
      {isLoading && <Spinner />}
    </StyledButton>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false
}
