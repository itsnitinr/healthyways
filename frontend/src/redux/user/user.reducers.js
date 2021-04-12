import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './user.types';

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, user: payload };
    case REGISTER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, user: payload.user, token: payload.token };
    case LOGIN_FAIL:
      return { loading: false, error: payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
