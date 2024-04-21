import { ReactNode, createContext, useReducer } from 'react'

import { Item, itemsReducer } from '@/reducers/cart/reducer'

import {
  addItemToCartAction,
  decreaseItemsCartAction,
  increaseItemsCartAction,
  removeItemsCartAction,
} from '@/reducers/cart/actions'

interface CartItemsContextType {
  items: Item[]
  totalCartItems: number
  addItemToCart: (item: Item) => void
  increaseItemsCart: (priceId: string) => void
  decreaseItemsCart: (priceId: string) => void
  removeItemsCart: (priceId: string) => void
}

export const CartItemsContext = createContext({} as CartItemsContextType)

interface CartItemsContextProviderProps {
  children: ReactNode
}

export function CartItemContextProvider({
  children,
}: CartItemsContextProviderProps) {
  const [cartItemState, dispatch] = useReducer(
    itemsReducer,
    { items: [] },
  )

  const { items } = cartItemState
  const totalCartItems = items.length

  function addItemToCart(data: Item,) {
    const newItem: Item = {
      amount: data.amount,
      product: data.product
    }

    dispatch(addItemToCartAction(newItem))
  }

  function increaseItemsCart(priceId: string) {
    dispatch(increaseItemsCartAction(priceId))
  }

  function decreaseItemsCart(priceId: string) {
    dispatch(decreaseItemsCartAction(priceId))
  }

  function removeItemsCart(priceId: string) {
    dispatch(removeItemsCartAction(priceId))
  }

  return (
    <CartItemsContext.Provider
      value={{
        items,
        totalCartItems,
        addItemToCart,
        increaseItemsCart,
        decreaseItemsCart,
        removeItemsCart,
      }}
    >
      {children}
    </CartItemsContext.Provider>
  )
}