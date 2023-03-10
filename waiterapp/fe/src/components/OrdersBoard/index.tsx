import { useState } from 'react'
import { toast } from 'react-toastify'
import { OrderModal } from '../OrderModal'
import { api } from '../../Utils/api'
import { Order } from '../../types/Order'
import { Board, OrdersContainer } from './styles'

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[]
  onCancelOrder: (orderId: string) => void
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectdOrder, setSelectedOrder] = useState<null | Order>(null)
  const [isLoading, setIsloading] = useState(false)

  function handleOpenModal(order: Order) {
    setIsModalVisible(true)
    setSelectedOrder(order)
  }

  function handleCloseModal() {
    setIsModalVisible(false)
    setSelectedOrder(null)
  }

  async function handleChangeOrderStatus() {
    setIsloading(true)

    const status = selectdOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE'

    await api.patch(`/orders/${selectdOrder?._id}`, { status })

    toast.success(`O pedido da mesa ${selectdOrder?.table} teve o status alterado!`)

    onChangeOrderStatus(selectdOrder!._id, status)
    setIsloading(false)
    setIsModalVisible(false)
  }

  async function handleCancelOrder() {
    setIsloading(true)

    await api.delete(`/orders/${selectdOrder?._id}`)

    toast.success(`O pedido da mesa ${selectdOrder?.table} foi cancelado!`)

    onCancelOrder(selectdOrder!._id)
    setIsloading(false)
    setIsModalVisible(false)
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectdOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  )
}
