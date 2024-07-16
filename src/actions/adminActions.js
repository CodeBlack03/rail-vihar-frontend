import axios from 'axios';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_DETAIL_REQUEST,
  FETCH_USER_DETAIL_SUCCESS,
  FETCH_USER_DETAIL_FAILURE,
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
  FETCH_USER_PAYMENTS_REQUEST,
  FETCH_USER_PAYMENTS_SUCCESS,
  FETCH_USER_PAYMENTS_FAILURE,
  DOWNLOAD_USERS_CSV_REQUEST,
  DOWNLOAD_USERS_CSV_SUCCESS,
  DOWNLOAD_USERS_CSV_FAILURE,
  FETCH_ALL_PAYMENTS_REQUEST,
  FETCH_ALL_PAYMENTS_SUCCESS,
  FETCH_ALL_PAYMENTS_FAILURE,
  APPROVE_PAYMENT_REQUEST,
  APPROVE_PAYMENT_FAILURE,
  REJECT_PAYMENT_REQUEST,
  REJECT_PAYMENT_FAILURE,
  FETCH_PAYMENT_DETAIL_REQUEST ,
  FETCH_PAYMENT_DETAIL_SUCCESS,
  FETCH_PAYMENT_DETAIL_FAILURE,
  DOWNLOAD_PAYMENT_FILE_REQUEST,
  DOWNLOAD_PAYMENT_FILE_SUCCESS,
  DOWNLOAD_PAYMENT_FILE_FAILURE,
  FETCH_ANNOUNCEMENT_DETAIL_SUCCESS,
  FETCH_ANNOUNCEMENTS_SUCCESS,
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
  DOWNLOAD_DOCUMENT_SUCCESS,
  EDIT_TOTAL_MONEY_FAILURE,
  FETCH_ANNOUNCEMENTS_FAILURE,
UPDATE_USER_STATUS_FAILURE,
UPDATE_USER_PROFILE_FAILURE,
FETCH_ANNOUNCEMENT_DETAIL_FAILURE,
DOWNLOAD_ANNOUNCEMENT_FILE_FAILURE,
} from './types';
import baseURL from '../URL';

export const fetchUsers = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USERS_REQUEST });
    const token = localStorage.getItem('admin-token');
    const response = await axios.get(`${baseURL}/api/admin/users`, { params: filters, headers: {
          Authorization: `Bearer ${token}`,
        }});
    console.log("Actions: ",response)
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload:  error.response.data
       
    });
  }
};

export const fetchUserDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_DETAIL_REQUEST });
    const token = localStorage.getItem('admin-token');
    const { data } = await axios.get(`${baseURL}/api/admin/users/${id}`,{headers: {
          Authorization: `Bearer ${token}`,
        }});
    dispatch({ type: FETCH_USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_USER_DETAIL_FAILURE, payload: error.response.data });
  }
};

export const downloadUsersCSV = () => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_USERS_CSV_REQUEST });
    const token = localStorage.getItem('admin-token');
    const { data } = await axios.get(`${baseURL}/api/admin/users/csv`, {
      headers: {
          Authorization: `Bearer ${token}`,
        },
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    dispatch({ type: DOWNLOAD_USERS_CSV_SUCCESS });
  } catch (error) {
    dispatch({ type: DOWNLOAD_USERS_CSV_FAILURE, payload: error.response.data });
  }
};

export const updateUserStatus = ({id, status}) => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');
    const data = {status:status}
    console.log(data)

    await axios.put(`${baseURL}/api/admin/users/${id}/status`,data,{headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        }} );
    dispatch(fetchUserDetail(id));
  } catch (error) {
    dispatch({ type: UPDATE_USER_STATUS_FAILURE, payload: error.response.data });
  }
};

export const updateUserProfile = (id, formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');
    await axios.put(`${baseURL}/api/admin/users/${id}`, formData,{headers: {
          Authorization: `Bearer ${token}`,
        }});
    dispatch(fetchUserDetail(id));
  } catch (error) {
    dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: error.response.data });
  }
};


export const deleteUser = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');

    await axios.delete(`${baseURL}/api/users/${id}`,{headers: {
          Authorization: `Bearer ${token}`,
        }});
    dispatch({
      type: 'DELETE_USER_SUCCESS',
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_USER_FAILURE',
      payload: error.response.data
    });
  }
};

export const fetchUserPayments = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');
    dispatch({ type: FETCH_USER_PAYMENTS_REQUEST });
    const { data } = await axios.get(`${baseURL}/api/admin/users/${id}/payments`,{headers: {
          Authorization: `Bearer ${token}`,
   } });
    dispatch({ type: FETCH_USER_PAYMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_USER_PAYMENTS_FAILURE, payload: error.response.data });
  }
};

export const fetchPendingPayments = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PENDING_PAYMENTS_REQUEST });
    const token = localStorage.getItem('admin-token');
    const response  = await axios.get(`${baseURL}/api/admin/payments/pending`,{headers: {
          Authorization: `Bearer ${token}`,
        }});
    dispatch({ type: FETCH_PENDING_PAYMENTS_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: FETCH_PENDING_PAYMENTS_FAILURE, payload: error.response.data });
  }
};

export const approvePayment = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');
    console.log("approve token", token);

    const res = await axios.put(`${baseURL}/api/admin/payments/${id}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: APPROVE_PAYMENT_SUCCESS, payload: id });
  } catch (error) {
      dispatch({ type:  APPROVE_PAYMENT_FAILURE, payload: error.response.data });

    console.error('Error approving payment:', error);
  }
};


export const rejectPayment = (id) => async (dispatch) => {
  try {
        const token = localStorage.getItem('admin-token');

    await axios.put(`${baseURL}/api/admin/payments/${id}/reject`,{},{headers: {
          Authorization: `Bearer ${token}`,
        }});
    dispatch({ type: REJECT_PAYMENT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type:  REJECT_PAYMENT_FAILURE, payload: error.response.data });

  }
};

export const fetchTotalMoney = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TOTAL_MONEY_REQUEST });
    const token = localStorage.getItem('admin-token');
    const response = await axios.get(`${baseURL}/api/admin/total-money-collected`,{headers: {
          Authorization: `Bearer ${token}`,
        }});
    console.log(response)
    dispatch({ type: FETCH_TOTAL_MONEY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TOTAL_MONEY_FAILURE, payload: error.response.data });
  }
};

export const editTotalMoney = (amount) => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');
    await axios.post(`${baseURL}/api/admin/total-money-collected`, {'totalAmount': amount},{headers: {
          Authorization: `Bearer ${token}`,
        }});
    dispatch(fetchTotalMoney());
  } catch (error) {
    dispatch({ type:  EDIT_TOTAL_MONEY_FAILURE, payload: error.response.data });

  }
};


export const fetchPayments = (params) => async dispatch => {
  try {
    dispatch({ type: FETCH_ALL_PAYMENTS_REQUEST });
    const token = localStorage.getItem('admin-token');
    const response = await axios.get(`${baseURL}/api/payments`, { params,headers: {
          Authorization: `Bearer ${token}`,
        } });

    dispatch({ type: FETCH_ALL_PAYMENTS_SUCCESS, payload: response });
  } catch (error) {
      dispatch({ type:  FETCH_ALL_PAYMENTS_FAILURE, payload: error.response.data });

  }
};

export const fetchPaymentDetail = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');
    dispatch({ type: FETCH_PAYMENT_DETAIL_REQUEST });
    const response  = await axios.get(`${baseURL}/api/admin/payments/${id}`,{headers: {
          Authorization: `Bearer ${token}`,
        }});
    //console.log("payment",response)
    dispatch({ type: FETCH_PAYMENT_DETAIL_SUCCESS, payload: response});
  } catch (error) {
    dispatch({ type: FETCH_PAYMENT_DETAIL_FAILURE, payload: error.response.data });
  }
};

export const downloadPaymentFile = (id,metaData) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_PAYMENT_FILE_REQUEST });
    const token = localStorage.getItem('admin-token');
    const response  = await axios.get(`${baseURL}/api/admin/payments/${id}/download`, {
      headers: {
          Authorization: `Bearer ${token}`,
        },
      responseType: 'blob',
    });
    console.log(response)

    const contentType = response.headers['content-type']; // Get content type from headers
    const originalFileName = `${metaData.user.name}_${new Date(metaData.date).toLocaleDateString()}_${metaData.user.houseNumber}/${metaData.user.houseType}`
    const fileExtension = contentType.split('/')[1]; // Extract file extension
    const fileName = `${originalFileName}.${fileExtension}`; // Combine with original file name

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // or any file extension
    document.body.appendChild(link);
    link.click();
    dispatch({ type: DOWNLOAD_PAYMENT_FILE_SUCCESS });
  } catch (error) {
    dispatch({ type: DOWNLOAD_PAYMENT_FILE_FAILURE, payload: error.response.data });
  }
};

export const deletePayment = (id) => async (dispatch) => {
  try {
        const token = localStorage.getItem('admin-token');

    await axios.delete(`${baseURL}/api/payments/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        }});
    dispatch({
      type: 'DELETE_PAYMENT_SUCCESS',
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_PAYMENT_FAILURE',
      payload: error.response.data
    });
  }
};

// Fetch all announcements
export const fetchAnnouncements = () => async dispatch => {
  try {
    const res = await axios.get(`${baseURL}/api/announcements`);
    dispatch({ type: FETCH_ANNOUNCEMENTS_SUCCESS, payload: res.data });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    dispatch({ type:  FETCH_ANNOUNCEMENTS_FAILURE,payload:error.response.data });

  }
};

// Fetch announcement detail by id
export const fetchAnnouncementDetail = (id) => async dispatch => {
  try {
    const res = await axios.get(`${baseURL}/api/announcements/${id}`);
    dispatch({ type: FETCH_ANNOUNCEMENT_DETAIL_SUCCESS, payload: res.data });
  } catch (error) {
    console.error(`Error fetching announcement ${id} detail:`, error);
    dispatch({ type:  FETCH_ANNOUNCEMENT_DETAIL_FAILURE, payload: error.response.data });

  }
};

// Post a new announcement
export const postAnnouncement = (formData) => async dispatch => {
  try {
    const token = localStorage.getItem('admin-token');
    const res = await axios.post(`${baseURL}/api/admin/announcements`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }
    });
    dispatch({ type: POST_ANNOUNCEMENT_SUCCESS, payload: res.data });
  } catch (error) {
    console.error('Error posting announcement:', error);
          dispatch({ type:  POST_ANNOUNCEMENT_FAILURE, payload: error.response.data });

  }
};

export const deleteAnnouncement = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');

    await axios.delete(`${baseURL}/api/announcements/${id}`,{
      headers: {
        
        Authorization: `Bearer ${token}`,
      }
    });
    dispatch({
      type: 'DELETE_ANNOUNCEMENT_SUCCESS',
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_ANNOUNCEMENT_FAIL',
      payload: error.response.data
    });
  }
};

// Download announcement file by id
export const downloadAnnouncementFile = (id,metaData) => async dispatch => {
  try {
    const res = await axios.get(`${baseURL}/api/announcements/${id}/download`, {
      responseType: 'blob'
    });
    console.log("Download Response",res)
    console.log(metaData)
    const originalFileName = `${metaData.name}`
    const contentType = res.headers['content-type']; // Get content type from headers
    const fileExtension = contentType.split('/')[1]; // Extract file extension
    const fileName = `${originalFileName}.${fileExtension}`; // Combine with original file name

    // Assuming handling of file download, for example:
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    dispatch({ type: DOWNLOAD_ANNOUNCEMENT_FILE_SUCCESS, payload: true });
  } catch (error) {
    console.error(`Error downloading announcement ${id} file:`, error);
          dispatch({ type:  DOWNLOAD_ANNOUNCEMENT_FILE_FAILURE, payload: error.response.data });

  }
};


// Fetch all documents
export const fetchDocuments = () => async dispatch => {
  dispatch({ type: FETCH_DOCUMENTS_REQUEST });
  try {
    const response = await axios.get(`${baseURL}/api/documents`);
    console.log(response)
    dispatch({ type: FETCH_DOCUMENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_DOCUMENTS_FAILURE, payload: error.response.data });
  }
};

// Fetch document detail
export const fetchDocumentDetail = (id) => async dispatch => {
  dispatch({ type: FETCH_DOCUMENT_DETAIL_REQUEST });
  try {
    const response = await axios.get(`${baseURL}/api/documents/${id}`);
    console.log("action", response)
    dispatch({ type: FETCH_DOCUMENT_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_DOCUMENT_DETAIL_FAILURE, payload: error.response.data });
  }
};

// Post a new document
export const postDocument = (formData) => async dispatch => {
  dispatch({ type: POST_DOCUMENT_REQUEST });
  try {
    const token = localStorage.getItem('admin-token');
    const response = await axios.post(`${baseURL}/api/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }
    });
    dispatch({ type: POST_DOCUMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_DOCUMENT_FAILURE, payload: error.response.data });
  }
};

// Download announcement file by id
export const downloadDocumentFile = (id,metaData) => async dispatch => {
  try {
    const res = await axios.get(`${baseURL}/api/documents/${id}/download`, {
      responseType: 'blob'
    });
    console.log("Meta Data: ",metaData)
    console.log("Response: ",res)
    // Assuming handling of file download, for example:
    const originalFileName = `${metaData.name}`
    const contentType = res.headers['content-type']; // Get content type from headers
    const fileExtension = contentType.split('/')[1]; // Extract file extension
    const fileName = `${originalFileName}.${fileExtension}`; // Combine with original file name

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    dispatch({ type: DOWNLOAD_DOCUMENT_SUCCESS, payload: true });
  } catch (error) {
    console.error(`Error downloading announcement ${id} file:`, error);
    dispatch({ type:  APPROVE_PAYMENT_FAILURE, payload: error.response.data });

  }
};

export const deleteDocument = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('admin-token');

    await axios.delete(`${baseURL}/api/documents/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    dispatch({
      type: 'DELETE_DOCUMENT_SUCCESS',
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_DOCUMENT_FAIL',
      payload: error.response.data
    });
  }
};