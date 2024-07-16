import {  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

export default function resetPasswordReducer(state = initialState, action) {
  const { type, payload } = action;
  //console.log(type,payload)
  switch (type) {
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