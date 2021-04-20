import {
  ADD_TO_CART,
  CLEAR_ITEM_FROM_CART,
  REMOVE_FROM_CART,
} from "./cart.types";

import { removeFromCart, addToCart } from "./cart.utils";
const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART: {
      const cart = addToCart(state.cartItems, payload)
      localStorage.setItem("cartItems", JSON.stringify(cart));
      return {
        ...state,
        cartItems: cart,
        totalQuantity: state.totalQuantity + 1,
      };
    }
    case REMOVE_FROM_CART: {
      const cart = removeFromCart(state.cartItems, payload)
      localStorage.setItem("cartItems", JSON.stringify(cart));
      return {
        ...state,
        cartItems: cart,
        totalQuantity: state.totalQuantity - 1,
      };
    }
    case CLEAR_ITEM_FROM_CART: {
      localStorage.setItem('cartItems',JSON.stringify([]))
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== payload
        ),
        totalQuantity:
          state.totalQuantity -
          state.cartItems.filter((cartItem) => cartItem._id === payload)[0]
            .quantity,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
