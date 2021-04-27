import { combineReducers } from "redux";

import alertReducer from "./alert/alert.reducers";
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
  userOnboardingReducer,
  userUpdateReducer,
} from "./user/user.reducers";
import {
  foodAddReducer,
  foodSearchReducer,
  getMyFoodReducer,
  getSingleFoodReducer,
} from "./food/food.reducers";
import { cartReducer } from "./cart/cart.reducers";
import { orderCreateReducer, orderListMyReducer } from "./order/order.reducers";

export default combineReducers({
  alert: alertReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
  userOnboarding: userOnboardingReducer,
  userUpdate: userUpdateReducer,
  foodAdd: foodAddReducer,
  foodSearch: foodSearchReducer,
  myfood: getMyFoodReducer,
  singleFood: getSingleFoodReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer,
});
