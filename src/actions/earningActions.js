import axios from 'axios';
import {DOWNLOAD_EARNING_FILE_REQUEST,DOWNLOAD_EARNING_FILE_SUCCESS,DOWNLOAD_EARNING_FILE_FAILURE} from './types'
import baseURL from '../URL'
export const fetchEarnings = (params) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_EARNINGS_REQUEST' });
    let token = localStorage.getItem('admin-token');
    if(!token){
      token = localStorage.getItem('token');
    }
    const response = await axios.get(`${baseURL}/api/earnings`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    params});
    dispatch({
      type: 'FETCH_EARNINGS_SUCCESS',
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_EARNINGS_FAILURE',
      payload: error.response.data
    });
  }
};

export const fetchEarningDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_EARNING_DETAIL_REQUEST' });
    const token = localStorage.getItem('admin-token');
    const response = await axios.get(`${baseURL}/api/earnings/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    dispatch({
      type: 'FETCH_EARNING_DETAIL_SUCCESS',
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_EARNING_DETAIL_FAILURE',
      payload: error.response.data
    });
  }
};

export const postEarning = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'POST_EARNING_REQUEST' });
    const token = localStorage.getItem('admin-token');
    const response = await axios.post(`${baseURL}/api/earnings`, formData,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    dispatch({
      type: 'POST_EARNING_SUCCESS',
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: 'POST_EARNING_FAILURE',
      payload: error.response.data
    });
  }
};

export const updateEarning = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_EARNING_REQUEST' });
    const token = localStorage.getItem('admin-token');
    const response = await axios.put(`${baseURL}/api/earnings/${id}`, formData,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    dispatch({
      type: 'UPDATE_EARNING_SUCCESS',
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_EARNING_FAILURE',
      payload: error.response.data
    });
  }
};

export const deleteEarning = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_EARNING_REQUEST' });
    const token = localStorage.getItem('admin-token');
    await axios.delete(`${baseURL}/api/earnings/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    dispatch({
      type: 'DELETE_EARNING_SUCCESS',
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_EARNING_FAILURE',
      payload: error.response.data
    });
  }
};

export const downloadEarningFile = (id,metaData) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_EARNING_FILE_REQUEST });
    const token = localStorage.getItem('admin-token');
    const response  = await axios.get(`${baseURL}/api/earnings/${id}/download`, {
      headers: {
          Authorization: `Bearer ${token}`,
        },
      responseType: 'blob',
    });
    
    console.log(response)
    const originalFileName=`${metaData.category}_${new Date(metaData.date).toLocaleDateString()}`
    const contentType = response.headers['content-type']; // Get content type from headers
    const fileExtension = contentType.split('/')[1]; // Extract file extension
    const fileName = `${originalFileName}.${fileExtension}`; // Combine with original file name

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // or any file extension
    document.body.appendChild(link);
    link.click();
    dispatch({ type: DOWNLOAD_EARNING_FILE_SUCCESS });
  } catch (error) {
    dispatch({ type: DOWNLOAD_EARNING_FILE_FAILURE, payload: error.response.data });
  }
};