import axios from 'axios';
import { enqueueSnackbar } from '../alert/alert.actions';

import {
  ADD_FOOD_REQUEST,
  ADD_FOOD_SUCCESS,
  ADD_FOOD_FAIL,
  SEARCH_FOOD_REQUEST,
  SEARCH_FOOD_SUCCESS,
  SEARCH_FOOD_FAIL,
} from './food.types';

export const addFoodItem = (formData) => async (dispatch, getState) => {
  const { userLogin } = getState();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userLogin.token}`,
    },
  };

  try {
    dispatch({ type: ADD_FOOD_REQUEST });
    const { data } = await axios.post('/api/foods', formData, config);
    dispatch({ type: ADD_FOOD_SUCCESS, payload: data.food });
    dispatch(
      enqueueSnackbar({
        message: 'Added food to your menu successfully',
        options: { variant: 'success' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ADD_FOOD_FAIL, payload: errorMsg });

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

export const searchFood = (search) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: SEARCH_FOOD_REQUEST });
    console.log(search);
    const { data } = await axios.post(
      `/api/foods/advanced?search=${search}`,
      {
        latitude: user.location.coordinates[1],
        longitude: user.location.coordinates[0],
      },
      config
    );
    dispatch({ type: SEARCH_FOOD_SUCCESS, payload: data.foods });
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: SEARCH_FOOD_FAIL, payload: errorMsg });

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
