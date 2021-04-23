import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
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
