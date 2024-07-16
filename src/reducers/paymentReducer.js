// paymentReducer.js
import {
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,MAKE_PAYMENT_SUCCESS, MAKE_PAYMENT_FAILURE
} from '../actions/types';

const initialState = {
  payments: [],
  paymentSuccess: false,
  error: null,
  metaData:null
};

const paymentReducer = (state = initialState, action) => {
  const {type,payload} = action
  switch (type) {
    case MAKE_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentSuccess: true,
        error: null,
      };
    case MAKE_PAYMENT_FAILURE:
      return {
        ...state,
        paymentSuccess: false,
        error: payload,
      };
    case FETCH_PAYMENTS_SUCCESS:
      console.log(payload)
      return {
        ...state,
        payments: payload.data,
        metaData:payload
      };
    case FETCH_PAYMENTS_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
