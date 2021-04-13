import axios from 'axios';
import { enqueueSnackbar } from '../alert/alert.actions';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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
  ONBOARDING_FAIL
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


export const onBoarding = (formData)=>async(dispatch,getState)=>{

  const {userLogin} = getState();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userLogin.token}`,
    },
  };

  try {
    
    dispatch({type: ONBOARDING_REQUEST});
    
    const { data } = await axios.post(
      `/api/users/onboarding`,
      formData,
      config
    );
    
    dispatch({type:ONBOARDING_SUCCESS});

    dispatch(
      enqueueSnackbar({
        message: 'Created profile successfully',
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
}