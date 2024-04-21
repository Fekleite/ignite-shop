import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { GetStaticProps } from "next"
import { useContext } from "react"
import Stripe from "stripe"
import Image from "next/image"
import { GetStaticPaths } from "next"
import Head from "next/head"

import { stripe } from "@/lib/stripe"
import { CartItemsContext } from "@/contexts/cart-context"
import { ProductType } from "@/@types/product"

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { addItemToCart } = useContext(CartItemsContext)

  function handleAddToCartProduct() {
    addItemToCart({
      product,
      amount: 1
    })
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={handleAddToCartProduct}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          productId: "prod_PpObQVDNm7Ik27"
        }
      },
    ],
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps<any, { productId: string }> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  const productId = params.productId

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
        priceNumber: price.unit_amount
      }
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}