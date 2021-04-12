import { combineReducers } from 'redux';

import alertReducer from './alert/alert.reducers';
import { userRegisterReducer, userLoginReducer } from './user/user.reducers';

export default combineReducers({
  alert: alertReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
});
