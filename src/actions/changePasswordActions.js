import axios from 'axios';
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from './types';
import baseURL from '../URL'


// Action creator to change password
export const changePassword = (passwordData) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });

  try {
    const token = localStorage.getItem('token');
    console.log("password data: ",passwordData)
    const response = await axios.post(`${baseURL}/api/users/change-password`, passwordData,{
        headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: response.data // Optionally, handle any response data from the server
    });
    alert('Password changed successfully!');
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: CHANGE_PASSWORD_FAILURE,
      payload: error.response ? error.response.data : {message: 'Failed to change password'}
    });
    alert('Failed to change password. Please try again.');
  }
};
