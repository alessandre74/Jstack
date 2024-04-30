import { Modal } from './Modal'

interface ConfirmDeleteModalProps {
  onClose(): void
}

export function ConfirmDeleteModal({ onClose }: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      Conteudo...
    </Modal>
  )
}
