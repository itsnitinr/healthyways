import axios from 'axios';
import { enqueueSnackbar } from '../alert/alert.actions';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ONBOARDING_REQUEST,
  ONBOARDING_SUCCESS,
  ONBOARDING_FAIL,
  ONBOARDING_RESET,
  EDIT_PASSWORD_REQUEST,
  EDIT_PASSWORD_SUCCESS,
  EDIT_PASSWORD_FAIL,
  GET_CHEFS_REQUEST,
  GET_CHEFS_SUCCESS,
  GET_CHEFS_FAIL,
  VERIFY_CHEF_REQUEST,
  VERIFY_CHEF_SUCCESS,
  VERIFY_CHEF_FAIL,
} from './user.types';

export const registerUser = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post('/api/users/register', formData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data });

    dispatch(
      enqueueSnackbar({
        message: 'Please check your inbox for verification',
        options: { variant: 'info' },
      })
    );

    history.push('/home');
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: REGISTER_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const loginUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post('/api/users/login', formData, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: LOGIN_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const verifyAccount = (verificationToken) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_REQUEST });

    await axios.put(`/api/users/verify/${verificationToken}`);

    dispatch({ type: VERIFY_SUCCESS });

    dispatch(
      enqueueSnackbar({
        message: 'Your email has been verified. Please log in.',
        options: { variant: 'success' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: VERIFY_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put('/api/users/forgot-password', { email }, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS });

    dispatch(
      enqueueSnackbar({
        message: 'An email with password reset link has been sent!',
        options: { variant: 'success' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const resetPassword = (password, resetToken) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/users/reset-password/${resetToken}`,
      { password },
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS });

    dispatch(
      enqueueSnackbar({
        message: 'Your password has been changed',
        options: { variant: 'success' },
      })
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const onBoarding = (formData) => async (dispatch, getState) => {
  const { userLogin } = getState();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userLogin.token}`,
    },
  };

  try {
    dispatch({ type: ONBOARDING_REQUEST });

    const { data } = await axios.post(
      `/api/users/onboarding`,
      formData,
      config
    );

    dispatch({ type: ONBOARDING_SUCCESS, payload: data });

    dispatch(
      enqueueSnackbar({
        message: 'Created profile successfully',
        options: { variant: 'success' },
      })
    );

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ONBOARDING_FAIL, payload: errorMsg });

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

export const updatePassword = (currentPassword, newPassword) => async (
  dispatch,
  getState
) => {
  const { userLogin } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userLogin.token}`,
    },
  };
  try {
    dispatch({ type: EDIT_PASSWORD_REQUEST });

    const { data } = await axios.put(
      '/api/users/update-password',
      { currentPassword, newPassword },
      config
    );
    dispatch({ type: EDIT_PASSWORD_SUCCESS, payload: data });
    dispatch(
      enqueueSnackbar({
        message: 'Updated password successfully',
        options: { variant: 'success' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: EDIT_PASSWORD_FAIL, payload: errorMsg });

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

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const getAllChefs = () => async (dispatch, getState) => {
  const { token } = getState().userLogin;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: GET_CHEFS_REQUEST });
    const { data } = await axios.get('/api/users/all', config);
    dispatch({ type: GET_CHEFS_SUCCESS, payload: data.chefs });
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: GET_CHEFS_FAIL, payload: errorMsg });

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

export const verifyChef = (id) => async (dispatch, getState) => {
  const { token } = getState().userLogin;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: VERIFY_CHEF_REQUEST });
    const { data } = await axios.put(`/api/users/${id}/verify`, {}, config);
    dispatch({ type: VERIFY_CHEF_SUCCESS, payload: data.chef });
    dispatch(
      enqueueSnackbar({
        message: 'This chef is now verified',
        options: { variant: 'success' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: VERIFY_CHEF_FAIL, payload: errorMsg });

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
