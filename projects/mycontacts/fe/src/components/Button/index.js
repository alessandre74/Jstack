import PropTypes from 'prop-types'
import { Spinner } from '../Spinner'
import { StyledButton } from './styles'

export function Button({
  type = 'button',
  disabled = false,
  isLoading = false,
  children,
  danger = false,
  onClick
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      danger={danger}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner />}
    </StyledButton>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  onClick: PropTypes.func
}
