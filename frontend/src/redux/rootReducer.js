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
} from "./food/food.reducers";
import { cartReducer } from "./cart/cart.reducers";
import { orderCreateReducer } from "./order/order.reducers";

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
  cart: cartReducer,
  orderCreate: orderCreateReducer,
});
