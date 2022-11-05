import React from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import CartScreen from './screens/CartScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import SearchScreen from './screens/SearchScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import SigninScreen from './screens/SigninScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import WishlistScreen from './screens/WishlistScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import DashboardScreen from './screens/DashboardScreen';
import ScrollToTop from './components/ScrollToTop';
import ShippingInfoScreen from './screens/ShippingInfoScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  return (
    <BrowserRouter>
    <HelmetProvider>
      <ScrollToTop>
        <Switch>
        <PrivateRoute path="/order/:orderId" component={OrderScreen} />
        <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRoute path="/payment" component={PaymentMethodScreen} />
        <PrivateRoute path="/shipping" component={ShippingAddressScreen} />
        <Route path="/cart/:productId?" component={CartScreen} />
        <Route path="/plant/:productSlug" component={ProductDetailsScreen} exact />
        <PrivateRoute path="/orderhistory" component={OrderHistoryScreen} exact />
        <AdminRoute path="/dashboard" component={DashboardScreen} exact />
        <AdminRoute path="/orderlist" component={OrderListScreen} exact />
        <AdminRoute path="/product/:productSlug/edit" component={ProductEditScreen} exact />
        <AdminRoute path="/productlist" component={ProductListScreen} exact />
        <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact />
        <AdminRoute path="/user/:userId/edit" component={UserEditScreen} />
        <AdminRoute path="/userlist" component={UserListScreen} />
        <PrivateRoute path="/wishlist" component={WishlistScreen} />
        <PrivateRoute path="/profile" component={ProfileScreen} />
        <Route path="/resetpassword/:id" component={!userInfo ?ResetPasswordScreen : HomeScreen} />
        <Route path="/forgotpassword" component={!userInfo ? ForgotPasswordScreen : HomeScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/plants/name/:name?" component={SearchScreen} exact />
        <Route path="/plants/category/:category" component={SearchScreen} exact/>
        <Route path="/plants/size/:size" component={SearchScreen} exact/>
        <Route path="/plants/category/:category/name/:name" component={SearchScreen} exact/>
        <Route path="/plants/category/:category/name/:name/size/:size/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen} exact/>
        <Route path="/aboutus" component={AboutUsScreen} exact />
        <Route path="/shippinginfo" component={ShippingInfoScreen} exact />
        <Route path="/" component={HomeScreen} exact />
        </Switch>
      </ScrollToTop>
    </HelmetProvider>
    </BrowserRouter>
  )
}

