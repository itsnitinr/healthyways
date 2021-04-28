import { combineReducers } from 'redux';

import alertReducer from './alert/alert.reducers';
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
  userOnboardingReducer,
  userUpdateReducer,
  chefListReducer,
  chefVerifyReducer,
} from './user/user.reducers';
import {
  foodAddReducer,
  foodSearchReducer,
  foodEditReducer,
  getMyFoodReducer,
} from './food/food.reducers';
import { cartReducer } from './cart/cart.reducers';
import {
  orderCreateReducer,
  orderListMyReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDispatchReducer,
} from './order/order.reducers';

export default combineReducers({
  alert: alertReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
  userOnboarding: userOnboardingReducer,
  userUpdate: userUpdateReducer,
  foodAdd: foodAddReducer,
  foodSearch: foodSearchReducer,
  foodEdit: foodEditReducer,
  myfood: getMyFoodReducer,
  chefList: chefListReducer,
  chefVerify: chefVerifyReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDispatch: orderDispatchReducer,
});
