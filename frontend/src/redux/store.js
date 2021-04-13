import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const middleware = [thunk];

const userFromLocalStorage = JSON.parse(localStorage.getItem('user')) || null;
const tokenFromLocalStorage = localStorage.getItem('token') || '';

const initialState = {
  userLogin: {
    user: userFromLocalStorage,
    token: tokenFromLocalStorage,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
