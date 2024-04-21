import { Handbag } from "@phosphor-icons/react";
import Image from "next/image";
import { useContext, useState } from "react";

import { HeaderContainer } from '@/styles/pages/app';

import { CartPanel } from '@/components/cart-panel';

import logoImg from '../assets/logo.svg'
import { CartItemsContext } from "@/contexts/cart-context";
import Link from "next/link";

export function Header() {
  const { totalCartItems } = useContext(CartItemsContext)
  const [isCartOpen, setIsCartOpen] = useState(false)

  function handleOpenCart() {
    setIsCartOpen(true)
  }

  function handleCloseCart() {
    setIsCartOpen(false)
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt='Ignite Shop' />
      </Link>

      <button onClick={handleOpenCart}>
        <Handbag size={24} />

        {totalCartItems > 0 && <span>{totalCartItems}</span>}
      </button>

      {isCartOpen && <CartPanel onClose={handleCloseCart} />}
    </HeaderContainer>
  )
}