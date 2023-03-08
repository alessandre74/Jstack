import { useState } from 'react'
import { FlatList } from 'react-native'
import { products } from '../../mocks/products'
import { Product } from '../../types/Product'
import { formatCurrency } from '../../Utils/formarCurrency'
import { PlusCircle } from '../Icons/PlusCircle'
import { ProductModal } from '../ProductModal'
import { Text } from '../Text'
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton
} from './styles'

export function Menu() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedProdut, setSelectedProdut] = useState<null | Product>(null)

  function handleOpenModal(product: Product) {
    setIsModalVisible(true)
    setSelectedProdut(product)
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProdut}
      />
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{ uri: `http://192.168.0.154:3001/uploads/${product.imagePath}` }}
            />

            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  )
}
