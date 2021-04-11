import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const middleware = [thunk];

const userFromLocalStorage = JSON.parse(localStorage.getItem('user')) || {};
const tokenFromLocalStorage = localStorage.getItem('token') || '';

const initialState = {
  auth: {
    user: userFromLocalStorage,
    token: tokenFromLocalStorage,
    isAuthenticated: userFromLocalStorage._id ? true : false,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
