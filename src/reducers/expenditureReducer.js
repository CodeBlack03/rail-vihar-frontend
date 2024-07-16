import {
  FETCH_EXPENDITURES_REQUEST,
  FETCH_EXPENDITURES_SUCCESS,
  FETCH_EXPENDITURES_FAILURE,
  FETCH_EXPENDITURE_DETAIL_REQUEST,
  FETCH_EXPENDITURE_DETAIL_SUCCESS,
  FETCH_EXPENDITURE_DETAIL_FAILURE,
} from '../actions/types';

const initialState = {
  expenditures: [],
  expenditure: null,
  loading: false,
  error: null,
  metaData:null
};

const expenditureReducer = (state = initialState, action) =>  {
  const {type,payload} = action
  switch (type) {
    case FETCH_EXPENDITURES_REQUEST:
    case FETCH_EXPENDITURE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EXPENDITURES_SUCCESS:
      
      return {
        ...state,
        loading: false,
        expenditures: payload.data,
        metaData: payload,
      };
    case FETCH_EXPENDITURES_FAILURE:
      return{
        ...state,
        error: payload,
        loading: false,
      }
    case FETCH_EXPENDITURE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_EXPENDITURE_DETAIL_SUCCESS:
      console.log("Exp Reducer",payload)
      return {
        ...state,
        loading: false,
        expenditure: payload,
      };
    case 'POST_EXPENDITURE_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'POST_EXPENDITURE_SUCCESS':
      return {
        ...state,
        loading: false,
        expenditures: [...state.expenditures, payload],
        error: null,
      };

    case 'POST_EXPENDITURE_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case 'UPDATE_EXPENDITURE_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'UPDATE_EXPENDITURE_SUCCESS':
      const updatedExpenditure = payload;
      const updatedExpenditures = state.expenditures.map(expenditure =>
        expenditure._id === updatedExpenditure._id ? updatedExpenditure : expenditure
      );
      return {
        ...state,
        loading: false,
        expenditures: updatedExpenditures,
        expenditureDetail: updatedExpenditure, // Update detail if edited from detail page
        error: null,
      };

    case 'UPDATE_EXPENDITURE_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case 'DELETE_EXPENDITURE_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'DELETE_EXPENDITURE_SUCCESS':
      return {
        ...state,
        loading: false,
        expenditures: state.expenditures.filter(expenditure => expenditure._id !== payload),
        expenditureDetail: null, // Clear detail if deleted from detail page
        error: null,
      };

    case 'DELETE_EXPENDITURE_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default expenditureReducer;
