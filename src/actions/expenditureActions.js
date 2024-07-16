import axios from 'axios';
import {
  FETCH_EXPENDITURES_REQUEST,
  FETCH_EXPENDITURES_SUCCESS,
  FETCH_EXPENDITURES_FAILURE,
  FETCH_EXPENDITURE_DETAIL_REQUEST,
  FETCH_EXPENDITURE_DETAIL_SUCCESS,
  FETCH_EXPENDITURE_DETAIL_FAILURE,
  DOWNLOAD_EXPENDITURE_FILE_REQUEST,
  DOWNLOAD_EXPENDITURE_FILE_SUCCESS,
  DOWNLOAD_EXPENDITURE_FILE_FAILURE
} from './types';
import baseURL from '../URL'


// Fetch all expenditures with filters and sorting
export const fetchExpenditures = (params) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EXPENDITURES_REQUEST });
    let token = localStorage.getItem('admin-token');
    if(!token){
      token = localStorage.getItem('token');
    }
    const response = await axios.get(`${baseURL}/api/expenditures`, {params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response",response)
    dispatch({
      type: FETCH_EXPENDITURES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_EXPENDITURES_FAILURE,
      payload: error.response.data
    });
  }
};

// Fetch single expenditure detail
export const fetchExpenditureDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EXPENDITURE_DETAIL_REQUEST });

   let token = localStorage.getItem('token');
    if(!token){
      token = localStorage.getItem('admin-token');
    }
    const response = await axios.get(`${baseURL}/api/expenditures/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: FETCH_EXPENDITURE_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_EXPENDITURE_DETAIL_FAILURE,
      payload: error.response.data
    });
  }
};


export const postExpenditure = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'POST_EXPENDITURE_REQUEST' });
    const token = localStorage.getItem('admin-token');
    const response = await axios.post(`${baseURL}/api/expenditures`, formData,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    dispatch({
      type: 'POST_EXPENDITURE_SUCCESS',
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: 'POST_EXPENDITURE_FAILURE',
      payload: error.response.data
    });
  }
};

export const updateExpenditure = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_EXPENDITURE_REQUEST' });
    const token = localStorage.getItem('admin-token');
    const response = await axios.put(`${baseURL}/api/expenditures/${id}`, formData,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    dispatch({
      type: 'UPDATE_EXPENDITURE_SUCCESS',
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_EXPENDITURE_FAILURE',
      payload: error.response.data
    });
  }
};

export const deleteExpenditure = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_EXPENDITURE_REQUEST' });
    const token = localStorage.getItem('admin-token');
    await axios.delete(`${baseURL}/api/expenditures/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    dispatch({
      type: 'DELETE_EXPENDITURE_SUCCESS',
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_EXPENDITURE_FAILURE',
      payload: error.response.data
    });
  }
};

export const downloadExpenditureFile = (id,metaData) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_EXPENDITURE_FILE_REQUEST });
    let token = localStorage.getItem('token');
    if(!token){
      token = localStorage.getItem('admin-token');
    }
    const response  = await axios.get(`${baseURL}/api/expenditures/${id}/download`, {
      headers: {
          Authorization: `Bearer ${token}`,
        },
      responseType: 'blob',
    });
    const originalFileName=`${metaData.category}_${new Date(metaData.date).toLocaleDateString()}`
    const contentType = response.headers['content-type']; // Get content type from headers
    const fileExtension = contentType.split('/')[1]; // Extract file extension
    const fileName = `${originalFileName}.${fileExtension}`; // Combine with original file name

    console.log(response)
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // or any file extension
    document.body.appendChild(link);
    link.click();
    dispatch({ type: DOWNLOAD_EXPENDITURE_FILE_SUCCESS });
  } catch (error) {
    dispatch({ type: DOWNLOAD_EXPENDITURE_FILE_FAILURE, payload: error.response.data });
  }
};