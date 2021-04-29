import axios from 'axios';
import { enqueueSnackbar } from '../alert/alert.actions';

import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ADMIN_ORDER_REVIEW_REQUEST,
  ADMIN_ORDER_REVIEW_SUCCESS,
  ADMIN_ORDER_REVIEW_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_DISPATCH_REQUEST,
  ORDER_DISPATCH_SUCCESS,
  ORDER_DISPATCH_FAIL,
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

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reviewOrder = (id, isConfirmed) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ORDER_REVIEW_REQUEST });

    const {
      userLogin: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `/api/orders/${id}/confirm`,
      { isConfirmed },
      config
    );

    dispatch({ type: ADMIN_ORDER_REVIEW_SUCCESS });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (id, razorpay_payment_id, razorpay_signature) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const {
      userLogin: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      `/api/orders/${id}/pay`,
      { razorpay_payment_id, razorpay_signature },
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const dispatchOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DISPATCH_REQUEST });

    const {
      userLogin: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(`/api/orders/${id}/ready`, {}, config);

    dispatch({ type: ORDER_DISPATCH_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DISPATCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
