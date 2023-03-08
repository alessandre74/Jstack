import { FlatList, TouchableOpacity } from 'react-native'
import { CartItem } from '../../types/CartItem'
import { formatCurrency } from '../../Utils/formarCurrency'
import { MinusCircle } from '../Icons/MinusCircle'
import { PlusCircle } from '../Icons/PlusCircle'
import { Text } from '../Text'
import {
  Item,
  ProductContainer,
  Actions,
  Image,
  QuantityContainer,
  ProductDatails
} from './styles'

interface CartProps {
  cartItems: CartItem[]
}

export function Cart({ cartItems }: CartProps) {
  return (
    <FlatList
      data={cartItems}
      keyExtractor={(cartItem) => cartItem.product._id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: cartItem }) => (
        <Item>
          <ProductContainer>
            <Image
              source={{
                uri: `http://192.168.0.154:3001/uploads/${cartItem.product.imagePath}`
              }}
            />

            <QuantityContainer>
              <Text size={14} color="#666">
                {cartItem.quantity}x
              </Text>
            </QuantityContainer>

            <ProductDatails>
              <Text size={14} weight="600">
                {cartItem.product.name}
              </Text>
              <Text size={14} color="#666" style={{ marginTop: 4 }}>
                {formatCurrency(cartItem.product.price)}
              </Text>
            </ProductDatails>
          </ProductContainer>

          <Actions>
            <TouchableOpacity style={{ marginRight: 24 }}>
              <PlusCircle />
            </TouchableOpacity>

            <TouchableOpacity>
              <MinusCircle />
            </TouchableOpacity>
          </Actions>
        </Item>
      )}
    />
  )
}
