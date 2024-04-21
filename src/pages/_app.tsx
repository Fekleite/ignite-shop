import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'


import { Container } from '@/styles/pages/app';
import { CartItemContextProvider } from '@/contexts/cart-context';
import { Header } from '@/components/header';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartItemContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartItemContextProvider>
  )
}