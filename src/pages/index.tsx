import { GetStaticProps } from 'next';
import Image from "next/image";
import Head from 'next/head';
import Stripe from 'stripe';
import { Handbag } from '@phosphor-icons/react';
import { useContext } from 'react';

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { stripe } from '@/lib/stripe';

import { HomeContainer, Product } from "@/styles/pages/home";
import { CartItemsContext } from '@/contexts/cart-context';
import { ProductType } from '@/@types/product';

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const { addItemToCart } = useContext(CartItemsContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.8,
      spacing: 48,
    },
  })

  function handleAddToCartProduct(product: ProductType) {
    addItemToCart({
      product,
      amount: 1
    })
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id} href={`/product/${product.id}`} prefetch={false} >
              <Image src={product.imageUrl} width={520} height={480} alt={product.name} />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <button onClick={() => handleAddToCartProduct(product)}>
                  <Handbag size={32} />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
      priceId: price.id,
      priceNumber: price.unit_amount
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}