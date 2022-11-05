import Axios from 'axios';
import {baseUrl} from '../utility';
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_FORGOT_FAIL, USER_FORGOT_REQUEST, USER_FORGOT_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_RESET_FAIL, USER_RESET_REQUEST, USER_RESET_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_WISHLIST_TOGGLE_REQUEST, USER_WISHLIST_TOGGLE_SUCCESS, USER_WISHLIST_TOGGLE_FAIL, USER_WISHLIST_LIST_REQUEST, USER_WISHLIST_LIST_SUCCESS, USER_WISHLIST_LIST_FAIL } from '../constants/userConstants';


const errorMessage = (error)=> {
  const message = error.response && error.response.data.message ? error.response.data.message : error.message;
  return message;
}

export const signin = (email, password)=> async(dispatch)=> {
  dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
  try {
    const {data} = await Axios.post(`${baseUrl}/api/users/signin`, {email, password});
    dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
    localStorage.setItem('plantingbd_userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({type: USER_SIGNIN_FAIL, payload: errorMessage(error)});
  }
}

export const signout = ()=> (dispatch)=> {
  localStorage.removeItem('plantingbd_userInfo');
  localStorage.removeItem('plantingbd_cartItems');
  localStorage.removeItem('plantingbd_shippingAddress');
  dispatch({type: USER_SIGNOUT});
  document.location.href = '/signin';
}

export const register = (name, email, password)=> async(dispatch)=> {
  dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}});
  try {
    const {data} = await Axios.post(`${baseUrl}/api/users/register`, {name, email, password});
    dispatch({type: USER_REGISTER_SUCCESS, payload: data});
    dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
    localStorage.setItem('plantingbd_userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({type: USER_REGISTER_FAIL, payload: errorMessage(error)});
  }
}

export const forgotPassword = (email)=> async(dispatch)=> {
  dispatch({type: USER_FORGOT_REQUEST, payload: {email}});
  try {
    const {data} = await Axios.put(`${baseUrl}/api/users/forgot-password`, {email});
    dispatch({type: USER_FORGOT_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: USER_FORGOT_FAIL, payload: errorMessage(error)});
  }
}

export const resetPassword = (resetLink, newPassword)=> async(dispatch)=> {
  dispatch({type: USER_RESET_REQUEST, payload: {resetLink, newPassword}});
  try {
    const {data} = await Axios.put(`${baseUrl}/api/users/reset-password`, {resetLink, newPassword});
    dispatch({type: USER_RESET_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: USER_RESET_FAIL, payload: errorMessage(error)});
  }
}

export const detailsUser = (userId)=> async(dispatch, getState)=> {
  dispatch({type: USER_DETAILS_REQUEST, payload: userId});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.get(`${baseUrl}/api/users/${userId}`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: USER_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: USER_DETAILS_FAIL, payload: errorMessage(error)});
  }
}

export const updateUserProfile = (user)=> async(dispatch, getState)=> {
  dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.put(`${baseUrl}/api/users/profile`, user, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
    dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
    localStorage.setItem('plantingbd_userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: errorMessage(error)});
  }
}

export const listUsers = ()=> async(dispatch, getState)=> {
  dispatch({type: USER_LIST_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.get(`${baseUrl}/api/users`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: USER_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: USER_LIST_FAIL, payload: errorMessage(error)});
  }
}

export const updateUser = (user)=> async(dispatch, getState)=> {
  dispatch({type: USER_UPDATE_REQUEST, payload: user});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.put(`${baseUrl}/api/users/${user._id}`, user, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: USER_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: USER_UPDATE_FAIL, payload: errorMessage(error)});
  }
}

export const deleteUser = (userId)=> async(dispatch, getState)=> {
  dispatch({type: USER_DELETE_REQUEST, payload: userId});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.delete(`${baseUrl}/api/users/${userId}`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: USER_DELETE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: USER_DELETE_FAIL, payload: errorMessage(error)});
  }
}

export const toggleWishListUser = (productId)=> async(dispatch, getState)=> {
  dispatch({type: USER_WISHLIST_TOGGLE_REQUEST, payload: productId});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.put(`${baseUrl}/api/users/wishlist`, {productId}, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: USER_WISHLIST_TOGGLE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: USER_WISHLIST_TOGGLE_FAIL, payload: errorMessage(error)});
  }
}

export const listUserWishList = ()=> async(dispatch, getState)=> {
  dispatch({type: USER_WISHLIST_LIST_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.get(`${baseUrl}/api/users/wishlist`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: USER_WISHLIST_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: USER_WISHLIST_LIST_FAIL, payload: errorMessage(error)});
  }
}