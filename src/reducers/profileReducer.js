// authReducer.js
import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from '../actions/types';

const initialState = {
  user:  null,
  isAuthenticated: !!localStorage.getItem('token'),
  profile: null,
  error: null,
};

const profileReducer = (state = initialState, action) => {
    const{type,payload} = action
  switch (type) {
    case FETCH_PROFILE_SUCCESS:
        //console.log("default",type,payload)
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user, // Ensure action.payload contains user data
        profile:payload.user,
        error: null,
      };
    case FETCH_PROFILE_FAILURE:
      
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        profile:null,
        error: payload, // Handle error response from API
      };
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.user,
        user: payload.user,
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:  
      return state;
  }
};

export default profileReducer;
