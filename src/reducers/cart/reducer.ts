import { produce } from 'immer'

import { ActionTypes } from './actions'
import { ProductType } from '@/@types/product'

export interface Item {
  product: ProductType
  amount: number
}

interface ItemsState {
  items: Item[]
}

export function itemsReducer(state: ItemsState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM_TO_CART:
      return produce(state, (draft) => {
        draft.items.push(action.payload.item)
      })
    case ActionTypes.INCREASE_ITEMS_CART: {
      const currentItemIndex = state.items.findIndex((item) => {
        return item.product.defaultPriceId === action.payload.priceId
      })

      if (currentItemIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.items[currentItemIndex].amount =
          draft.items[currentItemIndex].amount + 1
      })
    }
    case ActionTypes.DECREASE_ITEMS_CART: {
      const currentItemIndex = state.items.findIndex((item) => {
        return item.product.defaultPriceId === action.payload.priceId
      })

      if (currentItemIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.items[currentItemIndex].amount =
          draft.items[currentItemIndex].amount - 1
      })
    }
    case ActionTypes.REMOVE_ITEMS_CART: {
      const currentItemIndex = state.items.findIndex((item) => {
        return item.product.defaultPriceId === action.payload.priceId
      })

      if (currentItemIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.items.splice(currentItemIndex, 1)
      })
    }
    default:
      return state
  }
}