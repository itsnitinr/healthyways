import axios from 'axios';
import { enqueueSnackbar } from '../alert/alert.actions';

import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
} from './order.types';

export const placeOrder = (orderDetails) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    const { data } = await axios.post('/api/orders', orderDetails, config);
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
    dispatch(
      enqueueSnackbar({
        message: 'Placed order successfully!',
        options: {
          variant: 'success',
        },
      })
    );
  } catch (err) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: PLACE_ORDER_FAIL, payload: errorMsg });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: {
          variant: 'error',
        },
      })
    );
  }
};
