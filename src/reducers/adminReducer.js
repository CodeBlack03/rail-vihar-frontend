import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_DETAIL_REQUEST,
  FETCH_USER_DETAIL_SUCCESS,
  FETCH_USER_DETAIL_FAILURE,
  DOWNLOAD_USERS_CSV_REQUEST,
  DOWNLOAD_USERS_CSV_SUCCESS,
  DOWNLOAD_USERS_CSV_FAILURE,
  FETCH_PENDING_PAYMENTS_REQUEST,
  FETCH_PENDING_PAYMENTS_SUCCESS,
  FETCH_PENDING_PAYMENTS_FAILURE,
  FETCH_TOTAL_MONEY_REQUEST,
  FETCH_TOTAL_MONEY_SUCCESS,
  FETCH_TOTAL_MONEY_FAILURE,
  POST_ANNOUNCEMENT_REQUEST,
  POST_ANNOUNCEMENT_SUCCESS,
  POST_ANNOUNCEMENT_FAILURE,
  APPROVE_PAYMENT_SUCCESS,
  REJECT_PAYMENT_SUCCESS,
  FETCH_ALL_PAYMENTS_REQUEST,
  FETCH_ALL_PAYMENTS_SUCCESS,
  FETCH_ALL_PAYMENTS_FAILURE,
  FETCH_PAYMENT_DETAIL_REQUEST,
  FETCH_PAYMENT_DETAIL_SUCCESS,
  FETCH_PAYMENT_DETAIL_FAILURE,
  DOWNLOAD_PAYMENT_FILE_REQUEST,
  DOWNLOAD_PAYMENT_FILE_SUCCESS,
  DOWNLOAD_PAYMENT_FILE_FAILURE,
  FETCH_ADMIN_PROFILE_SUCCESS,
  FETCH_ADMIN_PROFILE_FAILURE,
  FETCH_ADMIN_PROFILE_REQUEST,
  FETCH_USER_PAYMENTS_FAILURE,
  FETCH_USER_PAYMENTS_SUCCESS,
  FETCH_USER_PAYMENTS_REQUEST,
  FETCH_ANNOUNCEMENTS_SUCCESS,
  FETCH_ANNOUNCEMENT_DETAIL_SUCCESS,
  DOWNLOAD_ANNOUNCEMENT_FILE_SUCCESS,
  FETCH_DOCUMENTS_REQUEST,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE,
  FETCH_DOCUMENT_DETAIL_REQUEST,
  FETCH_DOCUMENT_DETAIL_SUCCESS,
  FETCH_DOCUMENT_DETAIL_FAILURE,
  POST_DOCUMENT_REQUEST,
  POST_DOCUMENT_SUCCESS,
  POST_DOCUMENT_FAILURE,
  DOWNLOAD_DOCUMENT_REQUEST,
  DOWNLOAD_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENT_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from '../actions/types';

const initialState = {
  users: [],
  user: null,
  payments: [],
  userPayments: [],
  paymentDetail: null,
  pendingPayments: [],
  totalMoney: 0,
  loading: false,
  error: null,
  token: localStorage.getItem('admin-token'),
  isAuthenticated: !!localStorage.getItem('admin-token'),
  profile: null,
  metaData: null,
  announcements: [],
  announcementDetail: null,
  fileDownloaded: false,
  documents: [],
  documentDetail: null,
};

const adminReducer = (state = initialState, action) => {
  const {type,payload} = action;
  switch (type) {
    case FETCH_ADMIN_PROFILE_REQUEST:
    case FETCH_ADMIN_PROFILE_SUCCESS:{
      return{
        ...state,
        isAuthenticated:true,
        profile: payload.user
      }
    }
    case FETCH_ADMIN_PROFILE_FAILURE:
      return{
        ...state,
        error:payload
      }
    case FETCH_USERS_REQUEST:
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload),
      };

    case DELETE_USER_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case DOWNLOAD_USERS_CSV_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_DETAIL_REQUEST:
    case FETCH_PENDING_PAYMENTS_REQUEST:
    case FETCH_TOTAL_MONEY_REQUEST:
    case POST_ANNOUNCEMENT_REQUEST:
      return { ...state, loading: true };
    
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: payload.data.data,metaData:payload.data};

    case FETCH_USER_DETAIL_SUCCESS:
      return { ...state, loading: false, user: payload };
    case FETCH_USER_PAYMENTS_SUCCESS:
        return{...state, loading: false, userPayments: payload}
    case FETCH_PENDING_PAYMENTS_SUCCESS:
      console.log("pending reducer",payload)
      return { ...state, loading: false, pendingPayments: payload.data, metaData:payload};

    case FETCH_TOTAL_MONEY_SUCCESS:
      return { ...state, loading: false, totalMoney:payload };
    case APPROVE_PAYMENT_SUCCESS:
      return {
        ...state,
        pendingPayments: state.pendingPayments.filter(payment => payment._id !== payload),
      };

    case REJECT_PAYMENT_SUCCESS:
      return {
        ...state,
        pendingPayments: state.pendingPayments.filter(payment => payment._id !== payload),
      };
    case FETCH_ALL_PAYMENTS_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case 'DELETE_PAYMENT_SUCCESS':
      return {
        ...state,
        payments: state.payments.filter(payment => payment._id !== payload),
      };

    case 'DELETE_PAYMENT_FAILURE':
      return {
        ...state,
        error: payload,
      };
    case 'DELETE_ANNOUNCEMENT_SUCCESS':
      return {
        ...state,
        announcements: state.announcements.filter(announcement => announcement._id !== payload),
      };

    case 'DELETE_ANNOUNCEMENT_FAILURE':
      return {
        ...state,
        error: payload,
      };

    case FETCH_PAYMENT_DETAIL_REQUEST:
    case DOWNLOAD_PAYMENT_FILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_PAYMENTS_SUCCESS:
      ///console.log("reducer", payload)
      return {
        ...state,
        loading: false,
        payments: payload.data.data,
        metaData:payload.data
      };
    case FETCH_PAYMENT_DETAIL_SUCCESS:
      //console.log("reducer", payload)
      return {
        ...state,
        loading: false,
        paymentDetail: payload.data,
      };
    case DOWNLOAD_PAYMENT_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ALL_PAYMENTS_FAILURE:
      return{
        ...state,
        payments:[],
        error:payload
      }
    case FETCH_PAYMENT_DETAIL_FAILURE:
    case DOWNLOAD_PAYMENT_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case FETCH_USERS_FAILURE:
      return{
        ...state,
        error: payload
      }
    case FETCH_USER_DETAIL_FAILURE:
      return{
        ...state,
        error: payload
      }
    case FETCH_PENDING_PAYMENTS_FAILURE:
      return{
        ...state,
        error: payload
      }
    case FETCH_TOTAL_MONEY_FAILURE:
      return{
        ...state,
        error: payload
      }
    case POST_ANNOUNCEMENT_FAILURE:
      
      return { ...state, loading: false, error: payload };
    case FETCH_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        announcements: payload
      };
    case FETCH_ANNOUNCEMENT_DETAIL_SUCCESS:
      return {
        ...state,
        announcementDetail: payload
      };
    case POST_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        announcements: [payload, ...state.announcements]
      };
    case DOWNLOAD_ANNOUNCEMENT_FILE_SUCCESS:
      return {
        ...state,
        fileDownloaded: payload
      };
    case FETCH_DOCUMENTS_REQUEST:
    case FETCH_DOCUMENT_DETAIL_REQUEST:
    case POST_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action.payload,
      };
    case 'DELETE_DOCUMENT_SUCCESS':
      return {
        ...state,
        documents: state.documents.filter(document => document._id !== payload),
      };

    case 'DELETE_DOCUMENT_FAILURE':
      return {
        ...state,
        error: payload,
      };
    case FETCH_DOCUMENT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        documentDetail: action.payload,
      };
    case POST_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_DOCUMENTS_FAILURE:
      return{
        ...state,
        error: payload
      }
    case FETCH_DOCUMENT_DETAIL_FAILURE:
      return{
        ...state,
        error: payload
      }
    case POST_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DOWNLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        fileDownloaded: payload
      };
    default:
      return state;
  }
};

export default adminReducer;
