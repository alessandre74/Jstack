import PropTyes from 'prop-types'
import { Button } from '../Button'
import { ReactPortal } from '../ReactPortal'
import { Container, Overlay, Footer } from './styles'
import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount'

export function Modal({
  danger = false,
  visible,
  isLoading = false,
  title,
  children,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible)

  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!visible}>
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
      </Overlay>
    </ReactPortal>
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
