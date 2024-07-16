import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE,RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from './types';
import baseURL from '../URL';

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/api/users/auth`, userData);
    const {token, user} = res.data
    localStorage.setItem('token', res.data.token); // Store token in local storage
    console.log("res.data.user: ",res.data.user)
    localStorage.setItem('user', JSON.stringify(res.data.user));
    console.log(res.data.user)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {token,user},
    });
    window.location.href = '/dashboard';
  } catch (error) {
    console.log(error)
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data,
    });
  }
};

export const adminLogin = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/api/users/auth`, userData);
    const {token, user} = res.data
    console.log("Data ye aa rha",res.data)
    if(!res.data.isAdmin){
      console.log("Admin Nahi hai")
      alert("You are not an Admin")
      return 
      // dispatch({
      //   type:ADMIN_LOGIN_FAILURE,
      //   payload: {message: "You are not an Admin"}
      // })
    }
    localStorage.setItem('admin-token', res.data.token); // Store token in local storage
    //console.log("res.data.user: ",res.data.user)
    // localStorage.setItem('user', JSON.stringify(res.data.user));
    //console.log(res.data.user)
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: {token,user},
    });
    window.location.href = '/admin';
  } catch (error) {
    console.log("Auth Actions",error)
    console.log(error.response.data)
    dispatch({
      type: ADMIN_LOGIN_FAILURE,
      payload: error.response.data,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/api/users/register`, userData);
    const {token,user} = res.data
    localStorage.setItem('token', res.data.token); // Store token in local storage
    localStorage.setItem('user',res.data.user)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {token,user},
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data,
    });
  }
};

export const forgotPassword = (userData) => async (dispatch) => {
  try {
    console.log(userData)
    const res = await axios.post(`${baseURL}/api/users/forgot-password`, userData);
    console.log("response",res)
    alert(res.data.message)
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error.response.data,
    });
  }
};

// Reset password action
export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const { data } = await axios.post(`${baseURL}/api/users/reset/${token}`, { password, confirmPassword });

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.response.data });
  }
};