import Axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_HISTORY_REQUEST, ORDER_HISTORY_SUCCESS, ORDER_HISTORY_FAIL, ORDER_SUMMARY_REQUEST, ORDER_SUMMARY_SUCCESS, ORDER_SUMMARY_FAIL, ORDER_CONFIRM_REQUEST, ORDER_CONFIRM_SUCCESS, ORDER_CONFIRM_FAIL } from '../constants/orderConstants';
import { CART_EMPTY } from '../constants/cartConstants';
import { baseUrl } from '../utility';

const errorMessage = (error)=> {
  const message = error.response && error.response.data.message ? error.response.data.message : error.message;
  return message;
}

export const createOrder = (order)=> async(dispatch, getState)=> {
  dispatch({type: ORDER_CREATE_REQUEST, payload: order});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`${baseUrl}/api/orders`, order, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
    dispatch({type: CART_EMPTY});
    localStorage.removeItem('plantingbd_cartItems');
  } catch (error) {
    dispatch({type: ORDER_CREATE_FAIL, payload: errorMessage(error)});
  }
}

export const detailsOrder = (orderId)=> async(dispatch, getState)=> {
  dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.get(`${baseUrl}/api/orders/${orderId}`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ORDER_DETAILS_FAIL, payload: errorMessage(error)});
  }
}

export const confirmOrder = (orderId)=> async(dispatch, getState)=> {
  dispatch({type: ORDER_CONFIRM_REQUEST, payload: orderId});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.put(`${baseUrl}/api/orders/${orderId}/confirmed`, {}, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: ORDER_CONFIRM_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ORDER_CONFIRM_FAIL, payload: errorMessage(error)});
  }
}

export const deliverOrder = (orderId)=> async(dispatch, getState)=> {
  dispatch({type: ORDER_DELIVER_REQUEST, payload: orderId});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.put(`${baseUrl}/api/orders/${orderId}/deliver`, {}, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: ORDER_DELIVER_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ORDER_DELIVER_FAIL, payload: errorMessage(error)});
  }
}

export const payOrder = (orderId)=> async(dispatch, getState)=> {
  dispatch({type: ORDER_PAY_REQUEST, payload: orderId});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.put(`${baseUrl}/api/orders/${orderId}/pay`, {}, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: ORDER_PAY_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ORDER_PAY_FAIL, payload: errorMessage(error)});
  }
}

export const listOrders = ()=> async(dispatch, getState)=> {
  dispatch({type: ORDER_LIST_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.get(`${baseUrl}/api/orders`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: ORDER_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ORDER_LIST_FAIL, payload: errorMessage(error)});
  }
}

export const deleteOrder = (orderId)=> async(dispatch, getState)=> {
  dispatch({type: ORDER_DELETE_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.delete(`${baseUrl}/api/orders/${orderId}`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: ORDER_DELETE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ORDER_DELETE_FAIL, payload: errorMessage(error)});
  }
}

export const historyOrders = ()=> async(dispatch, getState)=> {
  dispatch({type: ORDER_HISTORY_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.get(`${baseUrl}/api/orders/mine`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: ORDER_HISTORY_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ORDER_HISTORY_FAIL, payload: errorMessage(error)});
  }
}

export const summaryOrder = ()=> async(dispatch, getState)=> {
  dispatch({type: ORDER_SUMMARY_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.get(`${baseUrl}/api/orders/summary`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: ORDER_SUMMARY_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ORDER_SUMMARY_FAIL, payload: errorMessage(error)});
  }
}