// paymentActions.js
import axios from 'axios';
import {
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  MAKE_PAYMENT_FAILURE,
  MAKE_PAYMENT_SUCCESS
} from './types';
import baseURL from '../URL'

// Make Payment
export const makePayment = (paymentData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    console.log("Action",paymentData)
    const response = await axios.post(`${baseURL}/api/payments`, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    dispatch({
      type: MAKE_PAYMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error making payment:', error);
    dispatch({
      type: MAKE_PAYMENT_FAILURE,
      payload: error.response.data,
    });
  }
};

// Fetch profile action

export const fetchPayments = (params) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
   console.log(params)
    const response = await axios.get(`${baseURL}/api/users/payments`, {params,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    console.log("response",response);
    dispatch({ type: FETCH_PAYMENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PAYMENTS_FAILURE, payload: error.response.data });
  }
};


