import { LOGOUT } from '../types';

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // Remove token from local storage
  dispatch({ type: LOGOUT });
  window.location.href = '/'; // Redirect to login page or homepage
};
