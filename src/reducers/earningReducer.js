const initialState = {
  earnings: [],
  earningDetail: null,
  loading: false,
  error: null,
  metaData: null
};

export const earningReducer = (state = initialState, action) => {
  const {type,payload} = action
  switch (type) {
    case 'FETCH_EARNINGS_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_EARNINGS_SUCCESS':
      console.log(payload)
      return {
        ...state,
        loading: false,
        earnings: payload.data.data,
        metaData: payload.data,
        error: null,
      };

    case 'FETCH_EARNINGS_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case 'FETCH_EARNING_DETAIL_REQUEST':
      return {
        ...state,
        loading: true,
        earningDetail: null,
      };

    case 'FETCH_EARNING_DETAIL_SUCCESS':
      console.log(payload)
      return {
        ...state,
        loading: false,
        earningDetail: payload.data,
        error: null,
      };

    case 'FETCH_EARNING_DETAIL_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case 'POST_EARNING_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'POST_EARNING_SUCCESS':
      return {
        ...state,
        loading: false,
        earnings: [...state.earnings, payload],
        error: null,
      };

    case 'POST_EARNING_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case 'UPDATE_EARNING_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'UPDATE_EARNING_SUCCESS':
      const updatedEarning = payload;
      const updatedEarnings = state.earnings.map(earning =>
        earning._id === updatedEarning._id ? updatedEarning : earning
      );
      return {
        ...state,
        loading: false,
        earnings: updatedEarnings,
        earningDetail: updatedEarning, // Update detail if edited from detail page
        error: null,
      };

    case 'UPDATE_EARNING_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case 'DELETE_EARNING_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'DELETE_EARNING_SUCCESS':
      return {
        ...state,
        loading: false,
        earnings: state.earnings.filter(earning => earning._id !== payload),
        earningDetail: null, // Clear detail if deleted from detail page
        error: null,
      };

    case 'DELETE_EARNING_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
