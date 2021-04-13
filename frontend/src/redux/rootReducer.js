import { combineReducers } from 'redux';

import alertReducer from './alert/alert.reducers';
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
  userOnboardingReducer
} from './user/user.reducers';

export default combineReducers({
  alert: alertReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
  userOnboarding:userOnboardingReducer
});
