import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE,RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  //console.log(type,payload)
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: null
      }
    case REGISTER_SUCCESS:
      
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: null,

      };
    case LOGIN_FAILURE:
      localStorage.removeItem('token');
      localStorage.removeItem('user')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: payload,
      };
    case ADMIN_LOGIN_FAILURE:
      console.log("Reducer",payload)
      localStorage.removeItem('admin-token')
      return{
        ...state,
        token:null,
        isAuthenticated: false,
        error: payload,
        user:null
      }
    case REGISTER_FAILURE:
      localStorage.removeItem('token');
      localStorage.removeItem('user')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: payload,
      };
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
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
