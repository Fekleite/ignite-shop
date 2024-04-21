import Link from "next/link";
import { ImageContainer, SuccessContainer, ImageList } from "@/styles/pages/purchase";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface PurchaseProps {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}

export default function Purchase({ customerName, products }: PurchaseProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImageList>
          {products.map((product, index) => (
            <ImageContainer key={index}>
              <Image src={product.imageUrl} alt={product.name} width={130} height={130} />
            </ImageContainer>
          ))}
        </ImageList>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camiseta(s) já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const session = await stripe.checkout.sessions.retrieve(String(sessionId), {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name
  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0]
    }
  })

  return {
    props: {
      customerName,
      products
    }
  }
}