import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app';
import Image from 'next/image';
import { Handbag } from '@phosphor-icons/react';
import { CartPanel } from '@/components/cart-panel';
import { useState } from 'react';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  function handleOpenCart() {
    setIsCartOpen(true)
  }

  function handleCloseCart() {
    setIsCartOpen(false)
  }

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt='Ignite Shop' />

        <button onClick={handleOpenCart}>
          <Handbag size={24} />

          <span>1</span>
        </button>
      </Header>

      <Component {...pageProps} />

      {isCartOpen && <CartPanel onClose={handleCloseCart} />}
    </Container>
  )
}