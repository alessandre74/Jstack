import PropTypes from 'prop-types'

import { Container } from './styles'

import xCircleIcon from '../../../assets/images/x-circle.svg'
import checkCircleIcon from '../../../assets/images/check-circle.svg'

export function ToastMessage({ message, onRemoveMessage }) {
  function handleRemoveToast() {
    onRemoveMessage(message.id)
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  )
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger'])
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired
}
