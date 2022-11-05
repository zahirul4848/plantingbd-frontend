import Axios from 'axios';
import { baseUrl } from '../utility';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, } from "../constants/cartConstants";


export const addToCart = (productId, qty)=> async(dispatch, getState)=> {
  const {data} = await Axios.get(`${baseUrl}/api/products/cart/${productId}`);
  dispatch({type: CART_ADD_ITEM, payload: {
    name: data.name,
    images: data.images,
    price: data.price,
    countInStock: data.countInStock,
    product: data._id,
    qty,
  }})
  localStorage.setItem('plantingbd_cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (productId)=> async(dispatch, getState)=> {
  dispatch({type: CART_REMOVE_ITEM, payload: productId});
  localStorage.setItem('plantingbd_cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (address)=> async(dispatch)=> {
  dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: address});
  localStorage.setItem('plantingbd_shippingAddress', JSON.stringify(address));
}

export const savePaymentMethod = (paymentMethod)=> async(dispatch)=> {
  dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod});
}
