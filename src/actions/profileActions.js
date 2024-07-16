import axios from 'axios';
import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  FETCH_ADMIN_PROFILE_FAILURE,
  FETCH_ADMIN_PROFILE_SUCCESS
} from './types';
import baseURL from '../URL'


// Fetch profile action
export const fetchProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
    const response = await axios.get(`${baseURL}/api/users/profile`, config);
    console.log("Success",response)
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("Error",error)
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload: error.response.data,
    });
  }
};
export const fetchAdminProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');
    const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
    const response = await axios.get(`${baseURL}/api/users/profile`, config);
    dispatch({
      type: FETCH_ADMIN_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ADMIN_PROFILE_FAILURE,
      payload: error.response.data,
    });
  }
};

export const updateProfile = (updatedProfile) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseURL}/api/users/update-profile/`, updatedProfile,{header: {
      Authorization: `Bearer ${token}`
    }});
    console.log("Updated profile: ",updatedProfile)
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.response.data });
  }
};

// Action creator to change password
export const changePassword = (passwordData) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });

  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseURL}/api/users/change-password`, passwordData,{header:{
      Authorization:`Bearer ${token}`
    }});
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: response.data // Optionally, handle any response data from the server
    });
    alert('Password changed successfully!');
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAILURE,
      payload: error.response ? error.response.data :{message: 'Failed to change password'}
    });
    alert('Failed to change password. Please try again.');
  }
};