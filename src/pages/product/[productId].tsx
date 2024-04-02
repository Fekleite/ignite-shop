import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { GetStaticProps } from "next"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import Image from "next/image"
import { GetStaticPaths } from "next"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string,
    price: string,
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
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
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}