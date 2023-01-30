import ReactDOM from 'react-dom'
import PropTyes from 'prop-types'

import { Button } from '../Button'
import { Container, Overlay, Footer } from './styles'

export function Modal({
  danger,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm
}) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>

        <div className="modal-body">{children}</div>

        <Footer>
          <button onClick={onCancel} type="button" className="cancel-button">
            {cancelLabel}
          </button>
          <Button onClick={onConfirm} type="button" danger={danger}>
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
  title: PropTyes.string.isRequired,
  children: PropTyes.node.isRequired,
  cancelLabel: PropTyes.string,
  confirmLabel: PropTyes.string,
  onCancel: PropTyes.func.isRequired,
  onConfirm: PropTyes.func.isRequired
}

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar'
}
