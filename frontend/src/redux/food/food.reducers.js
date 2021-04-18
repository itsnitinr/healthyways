import {
  ADD_FOOD_REQUEST,
  ADD_FOOD_SUCCESS,
  ADD_FOOD_FAIL,
} from './food.types';

export const foodAddReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_FOOD_REQUEST:
      return { loading: true };
    case ADD_FOOD_SUCCESS:
      return { loading: false, food: payload };
    case ADD_FOOD_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
