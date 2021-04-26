import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_RESET,
} from './order.types';

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PLACE_ORDER_REQUEST:
      return { loading: true };
    case PLACE_ORDER_SUCCESS:
      return { loading: false, order: payload, success: true };
    case PLACE_ORDER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return { loading: true };
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_MY_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    case GET_MY_ORDERS_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
