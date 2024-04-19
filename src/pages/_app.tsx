import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app';
import Image from 'next/image';
import { Handbag } from '@phosphor-icons/react';
import { CartPanel } from '@/components/cart-panel';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt='Ignite Shop' />

        <button>
          <Handbag size={24} />

          <span>1</span>
        </button>
      </Header>

      <Component {...pageProps} />

      <CartPanel />
    </Container>
  )
}