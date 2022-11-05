import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderConfirmReducer, orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderHistoryReducer, orderListReducer, orderPayReducer, orderSummaryReducer } from './reducers/orderReducers';
import { productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productSizeListReducer, productTopRatingListReducer, productUpdateReducer } from './reducers/productReducers';
import { userDeleteReducer, userDetailsReducer, userForgotPasswordReducer, userListReducer, userRegisterReducer, userResetPasswordReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer, userWishlistListReducer, userWishlistToggleReducer } from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('plantingbd_userInfo') ? JSON.parse(localStorage.getItem('plantingbd_userInfo')) : null,
  },
  cart: {
    cartItems: localStorage.getItem('plantingbd_cartItems') ? JSON.parse(localStorage.getItem('plantingbd_cartItems')) : [],
    shippingAddress: localStorage.getItem('plantingbd_shippingAddress') ? JSON.parse(localStorage.getItem('plantingbd_shippingAddress')) : {},
    paymentMethod: 'Cash on Delivery',
  }
}

const reducers = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userWishlistToggle: userWishlistToggleReducer,
  userWishlistList: userWishlistListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderConfirm: orderConfirmReducer,
  orderDeliver: orderDeliverReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderHistory: orderHistoryReducer,
  orderSummary: orderSummaryReducer,
  productCategoryList: productCategoryListReducer,
  productSizeList: productSizeListReducer,
  productTopRatingList: productTopRatingListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;