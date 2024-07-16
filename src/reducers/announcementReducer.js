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

const announcementReducer = (state = initialState, action) => {
  const {type,payload} = action;
  switch (type) {
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
      case POST_ANNOUNCEMENT_REQUEST:
      return { ...state, loading: true };
      default:
      return state;
  }
};

export default announcementReducer;