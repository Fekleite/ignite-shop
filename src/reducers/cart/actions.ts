import { Item } from './reducer'

export enum ActionTypes {
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
  INCREASE_ITEMS_CART = 'INCREASE_ITEMS_CART',
  DECREASE_ITEMS_CART = 'DECREASE_ITEMS_CART',
  REMOVE_ITEMS_CART = 'REMOVE_ITEMS_CART',
}

export function addItemToCartAction(item: Item) {
  return {
    type: ActionTypes.ADD_ITEM_TO_CART,
    payload: {
      item,
    },
  }
}

export function increaseItemsCartAction(priceId: string) {
  return {
    type: ActionTypes.INCREASE_ITEMS_CART,
    payload: {
      priceId,
    },
  }
}

export function decreaseItemsCartAction(priceId: string) {
  return {
    type: ActionTypes.DECREASE_ITEMS_CART,
    payload: {
      priceId,
    },
  }
}

export function removeItemsCartAction(priceId: string) {
  return {
    type: ActionTypes.REMOVE_ITEMS_CART,
    payload: {
      priceId,
    },
  }
}