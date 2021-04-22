import { combineReducers } from 'redux';

import alertReducer from './alert/alert.reducers';
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
  userOnboardingReducer,
} from './user/user.reducers';
import { foodAddReducer, foodSearchReducer } from './food/food.reducers';
import { cartReducer } from './cart/cart.reducers';
import { orderCreateReducer } from './order/order.reducers';

export default combineReducers({
  alert: alertReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
  userOnboarding: userOnboardingReducer,
  foodAdd: foodAddReducer,
  foodSearch: foodSearchReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
});
