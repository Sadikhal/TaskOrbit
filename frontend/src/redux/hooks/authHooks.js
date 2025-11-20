import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginUser,
  fetchUser,
  logoutUser,
  updateUser,
  clearAuthError } from "../slices/authSlice";

//  returns all authentication actions for register, login, logout, update, fetch.
 
export const useAuthActions = () => {
  const dispatch = useDispatch();

  return {
    authRegister: (data) => dispatch(registerUser(data)),
    authLogin: (data) => dispatch(loginUser(data)),
    authFetchUser: () => dispatch(fetchUser()),
    authLogout: () => dispatch(logoutUser()),
    authUpdateUser: (data) => dispatch(updateUser(data)),
    clearError: () => dispatch(clearAuthError()),
  };
};

  // returns user, loading, error, isAuthenticated
export const useAuthState = () => {
  return useSelector((state) => state.auth);
};
