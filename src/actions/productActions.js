import Axios from 'axios';
import { baseUrl } from '../utility';
import { PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REVIEW_CREATE_FAIL, PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_SIZE_LIST_FAIL, PRODUCT_SIZE_LIST_REQUEST, PRODUCT_SIZE_LIST_SUCCESS, PRODUCT_TOP_RATING_LIST_FAIL, PRODUCT_TOP_RATING_LIST_REQUEST, PRODUCT_TOP_RATING_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants"
const errorMessage = (error)=> {
  const message = error.response && error.response.data.message ? error.response.data.message : error.message;
  return message;
}

export const listProducts = ({pageNumber='', name= '', category= '', size= '', order= '', min= 0, max= 0, rating= 0})=> async(dispatch)=> {
  dispatch({type: PRODUCT_LIST_REQUEST});
  try {
    const {data} = await Axios.get(`${baseUrl}/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&size=${size}&min=${min}&max=${max}&rating=${rating}&order=${order}`);
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_LIST_FAIL, payload: errorMessage(error)});
  }
}


export const deleteProduct = (productId)=> async(dispatch, getState)=> {
  dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = Axios.delete(`${baseUrl}/api/products/${productId}`, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_DELETE_FAIL, payload: errorMessage(error)});
  }
}

export const createProduct = ()=> async(dispatch, getState)=> {
  dispatch({type: PRODUCT_CREATE_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`${baseUrl}/api/products`, {}, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data.product});
  } catch (error) {
    dispatch({type: PRODUCT_CREATE_FAIL, payload: errorMessage(error)});
  }
}

export const detailsProduct = (productSlug)=> async(dispatch)=> {
  dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productSlug});
  try {
    const {data} = await Axios.get(`${baseUrl}/api/products/${productSlug}`);
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_DETAILS_FAIL, payload: errorMessage(error)});
  }
}

export const updateProduct = (product)=> async(dispatch, getState)=> {
  dispatch({type: PRODUCT_UPDATE_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.put(`${baseUrl}/api/products/${product._id}`, product, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_UPDATE_FAIL, payload: errorMessage(error)});
  }
}

export const createReview = (productId, review)=> async(dispatch, getState)=> {
  dispatch({type: PRODUCT_REVIEW_CREATE_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`${baseUrl}/api/products/${productId}/reviews`, review, {headers: {Authorization: `Bearer ${userInfo.token}`}});
    dispatch({type: PRODUCT_REVIEW_CREATE_SUCCESS, payload: data.review});
  } catch (error) {
    dispatch({type: PRODUCT_REVIEW_CREATE_FAIL, payload: errorMessage(error)});
  }
}

export const listProductCategory = ()=> async(dispatch)=> {
  dispatch({type: PRODUCT_CATEGORY_LIST_REQUEST});
  try {
    const {data} = await Axios.get(`${baseUrl}/api/products/categories`);
    dispatch({type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_CATEGORY_LIST_FAIL, payload: errorMessage(error)});
  }
}

export const listProductSize = ()=> async(dispatch)=> {
  dispatch({type: PRODUCT_SIZE_LIST_REQUEST});
  try {
    const {data} = await Axios.get(`${baseUrl}/api/products/sizes`);
    dispatch({type: PRODUCT_SIZE_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_SIZE_LIST_FAIL, payload: errorMessage(error)});
  }
}

export const listTopRatingProducts = ()=> async(dispatch)=> {
  dispatch({type: PRODUCT_TOP_RATING_LIST_REQUEST});
  try {
    const {data} = await Axios.get(`${baseUrl}/api/products/top-products`);
    dispatch({type: PRODUCT_TOP_RATING_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_TOP_RATING_LIST_FAIL, payload: errorMessage(error)});
  }
}