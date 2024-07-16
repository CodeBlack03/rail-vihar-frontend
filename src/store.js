import {createStore,combineReducers,applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer'; // Replace with your actual reducer
import paymentReducer from './reducers/paymentReducer';
import profileReducer from './reducers/profileReducer';
import expenditureReducer from './reducers/expenditureReducer';
import changePasswordReducer from './reducers/changePasswordReducer';
import adminReducer from './reducers/adminReducer';
import { earningReducer } from './reducers/earningReducer';
import forgotPasswordReducer from './reducers/forgotPasswordReducer';
import resetPasswordReducer from './reducers/resetPasswordReducer';
import documentReducer from './reducers/documentReducer';
import announcementReducer from './reducers/announcementReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  payments: paymentReducer,
  expenditures: expenditureReducer,
  changePassword: changePasswordReducer,
  admin: adminReducer,
  earnings: earningReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword:resetPasswordReducer,
  document:documentReducer,
  announcement: announcementReducer
  // Add more reducers here if needed
});
const middleware = [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);
export default store;
