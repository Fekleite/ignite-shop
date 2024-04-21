import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useContext, useState } from "react";

import {
  PanelContainer,
  CloseButton,
  CartProductList,
  ScrollableArea,
  CartItem,
  ImageContainer,
  CartResume
} from "@/styles/components/cart-panel";
import { CartItemsContext } from "@/contexts/cart-context";
import axios from "axios";

interface CartPanelProps {
  onClose: () => void
}

export function CartPanel({ onClose }: CartPanelProps) {
  const { items, totalCartItems, removeItemsCart } = useContext(CartItemsContext)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.product.priceNumber
  }, 0)

  const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalPrice / 100)



  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const checkoutItems = items.map(item => {
        return {
          price: item.product.defaultPriceId,
          quantity: item.amount
        }
      })

      const response = await axios.post('/api/checkout', {
        items: checkoutItems
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <PanelContainer>
      <CloseButton onClick={onClose}>
        <X size={24} />
      </CloseButton>

      <CartProductList>
        <h3>Sacola de compras</h3>

        <ScrollableArea>
          {items.map(item => (
            <CartItem key={item.product.id}>
              <ImageContainer>
                <Image src={item.product.imageUrl} alt={item.product.name} width={94} height={94} />
              </ImageContainer>

              <div>
                <span>{item.product.name}</span>
                <strong>{item.product.price}</strong>
                <button onClick={() => removeItemsCart(item.product.defaultPriceId)}>Remover</button>
              </div>
            </CartItem>
          ))}
        </ScrollableArea>
      </CartProductList>

      <footer>
        <CartResume>
          <div>
            <span>Quantidade</span>
            <span>{totalCartItems}</span>
          </div>

          <div>
            <strong>Valor total</strong>
            <strong>{formattedTotalPrice}</strong>
          </div>
        </CartResume>

        <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>Finalizar compra</button>
      </footer>
    </PanelContainer>
  )
}