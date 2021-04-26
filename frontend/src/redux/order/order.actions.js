import axios from 'axios';
import { enqueueSnackbar } from '../alert/alert.actions';

import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from './order.types';

export const placeOrder = (orderDetails) => async (dispatch, getState) => {
  const { token } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
  } catch (error) {
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

export const getMyOrders = (role) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_ORDERS_REQUEST });

    const { token } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${role}/my`, config);

    dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
