import {
  FETCH_DOCUMENTS_REQUEST,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE,
  FETCH_DOCUMENT_DETAIL_REQUEST,
  FETCH_DOCUMENT_DETAIL_SUCCESS,
  FETCH_DOCUMENT_DETAIL_FAILURE,
  POST_DOCUMENT_REQUEST,
  POST_DOCUMENT_SUCCESS,
  POST_DOCUMENT_FAILURE,
  DOWNLOAD_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENT_FAILURE,

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


const documentReducer = (state = initialState, action) => {
  const {type,payload} = action;
  switch (type) {
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
    case DOWNLOAD_DOCUMENT_FAILURE:
        return {
            ...state,
            error:payload
        }
    default:
      return state;
  }
};






export default documentReducer;