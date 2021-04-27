import {
  ADD_FOOD_REQUEST,
  ADD_FOOD_SUCCESS,
  ADD_FOOD_FAIL,
  SEARCH_FOOD_REQUEST,
  SEARCH_FOOD_SUCCESS,
  SEARCH_FOOD_FAIL,
  UPDATE_FOOD_REQUEST,
  UPDATE_FOOD_SUCCESS,
  UPDATE_FOOD_FAIL,
  GET_MY_FOOD_REQUEST,
  GET_MY_FOOD_SUCCESS,
  GET_MY_FOOD_FAIL,
  GET_SINGLE_FOODITEM_REQUEST,
  GET_SINGLE_FOODITEM_SUCCESS,
  GET_SINGLE_FOODITEM_FAIL,
} from "./food.types";

export const foodAddReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_FOOD_REQUEST:
    case UPDATE_FOOD_REQUEST:
      return { loading: true };
    case ADD_FOOD_SUCCESS:
    case UPDATE_FOOD_SUCCESS:
      return { loading: false, food: payload };
    case ADD_FOOD_FAIL:
    case UPDATE_FOOD_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const foodSearchReducer = (
  state = { foods: [], loading: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_FOOD_REQUEST:
      return { loading: true };
    case SEARCH_FOOD_SUCCESS:
      return { loading: false, foods: payload };
    case SEARCH_FOOD_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const getMyFoodReducer = (
  state = { foods: [], loading: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_FOOD_REQUEST:
      return { loading: true };
    case GET_MY_FOOD_SUCCESS:
      return { loading: false, foods: payload };
    case GET_MY_FOOD_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const getSingleFoodReducer = (
  state = { food: {}, loading: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SINGLE_FOODITEM_REQUEST:
      return { loading: true };
    case GET_SINGLE_FOODITEM_SUCCESS:
      return { loading: false, food: payload };
    case GET_SINGLE_FOODITEM_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
