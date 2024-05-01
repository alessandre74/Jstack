import { Button } from './Button'
import { Modal } from './Modal'
import { TrashIcon } from './icons/TrashIcon'

interface ConfirmDeleteModalProps {
  onClose(): void
}

export function ConfirmDeleteModal({ onClose }: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold">
          Tem certeza que deseja excluir está conta?
        </p>
        <p className="tracking-[-0.5px] text-gray-800">
          Ao excluir a conta, também serão excluídos todos os registros de receita e despesas
          relacionados.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <Button className="w-full" danger>
          Sim, desejo excluir
        </Button>
        <Button className="w-full">Cancelar</Button>
      </div>
    </Modal>
  )
}
