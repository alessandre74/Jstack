import ReactDOM from 'react-dom'
import PropTyes from 'prop-types'

import { Button } from '../Button'
import { Container, Overlay, Footer } from './styles'

export function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo do Modal</h1>

        <p>Corpo do modal</p>

        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')
  )
}
Modal.propTypes = {
  danger: PropTyes.bool.isRequired
}

Modal.defaultProps = {
  danger: false
}
