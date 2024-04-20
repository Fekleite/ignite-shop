import { X } from "@phosphor-icons/react";
import Image from "next/image";

import shirtImage from '@/assets/shirts/shirt-1.png'
import {
  PanelContainer,
  CloseButton,
  CartProductList,
  ScrollableArea,
  CartItem,
  ImageContainer,
  CartResume
} from "@/styles/components/cart-panel";

interface CartPanelProps {
  onClose: () => void
}

export function CartPanel({ onClose }: CartPanelProps) {
  return (
    <PanelContainer>
      <CloseButton onClick={onClose}>
        <X size={24} />
      </CloseButton>

      <CartProductList>
        <h3>Sacola de compras</h3>

        <ScrollableArea>
          <CartItem>
            <ImageContainer>
              <Image src={shirtImage} alt="Camisa" width={94} height={94} />
            </ImageContainer>

            <div>
              <span>Camiseta Beyond the Limits</span>
              <strong>R$ 79,90</strong>
              <button>Remover</button>
            </div>
          </CartItem>

          <CartItem>
            <ImageContainer>
              <Image src={shirtImage} alt="Camisa" width={94} height={94} />
            </ImageContainer>

            <div>
              <span>Camiseta Beyond the Limits</span>
              <strong>R$ 79,90</strong>
              <button>Remover</button>
            </div>
          </CartItem>
        </ScrollableArea>
      </CartProductList>

      <footer>
        <CartResume>
          <div>
            <span>Quantidade</span>
            <span>3 itens</span>
          </div>

          <div>
            <strong>Valor total</strong>
            <strong>R$ 270,00</strong>
          </div>
        </CartResume>

        <button>Finalizar compra</button>
      </footer>
    </PanelContainer>
  )
}