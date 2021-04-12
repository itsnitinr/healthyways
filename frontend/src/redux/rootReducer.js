import { combineReducers } from 'redux';

import { userRegisterReducer, userLoginReducer } from './user/user.reducers';

export default combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
});
