import { Modal } from 'react-native'
import { Button } from '../Button'
import { CheckCircle } from '../Icons/CheckCircle'
import { Text } from '../Text'
import { Container, OkButton } from './styles'

interface OrderConfirmedModalProps {
  visible: boolean
  onOk: () => void
}

export function OrderConfirmedModal({ visible, onOk }: OrderConfirmedModalProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido Confirmado
        </Text>

        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O Pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onOk}>
          <Text color="#D73035" weight="600">
            Ok
          </Text>
        </OkButton>
      </Container>
    </Modal>
  )
}
