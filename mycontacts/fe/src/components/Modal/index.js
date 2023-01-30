import ReactDOM from 'react-dom'
import PropTyes from 'prop-types'

import { Button } from '../Button'
import { Container, Overlay, Footer } from './styles'

export function Modal({
  danger,
  visible,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm
}) {
  if (!visible) {
    return null
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>

        <div className="modal-body">{children}</div>

        <Footer>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <Button
            type="button"
            danger={danger}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')
  )
}
Modal.propTypes = {
  danger: PropTyes.bool.isRequired,
  visible: PropTyes.bool.isRequired,
  isLoading: PropTyes.bool,
  title: PropTyes.string.isRequired,
  children: PropTyes.node.isRequired,
  cancelLabel: PropTyes.string,
  confirmLabel: PropTyes.string,
  onCancel: PropTyes.func.isRequired,
  onConfirm: PropTyes.func.isRequired
}

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar'
}
