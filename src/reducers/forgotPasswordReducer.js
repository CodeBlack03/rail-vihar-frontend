import {  FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

export default function forgotPasswordReducer(state = initialState, action) {
  const { type, payload } = action;
  //console.log(type,payload)
  switch (type) {
    case FORGOT_PASSWORD_FAILURE:
      localStorage.removeItem('token');
      localStorage.removeItem('user')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
      default:
      return state;
  }
}