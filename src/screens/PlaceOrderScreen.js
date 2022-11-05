import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Helmet } from 'react-helmet-async';
import { baseUrl, slugify } from '../utility';

export default function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart);
  const {shippingAddress, cartItems, paymentMethod} = cart;
  const orderCreate = useSelector(state => state.orderCreate);
  const {loading, error, success, order} = orderCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if(cartItems.length === 0 || !shippingAddress.address || !paymentMethod) {
      props.history.push('/cart');
    }
  }, [shippingAddress, cartItems, paymentMethod, props.history]);
  
  useEffect(() => {
    if(success) {
      props.history.push(`/order/${order._id}?phone=confirmation`);
      dispatch({type: ORDER_CREATE_RESET});
    }
  }, [dispatch, success, props.history, order]);

  const toPrice = (num)=> Number(num.toFixed(2));
  cart.itemsPrice = toPrice(cartItems.reduce((a, c)=> a + c.price * c.qty, 0));
  cart.shippingPrice = cart.itemsPrice > 5000 ? toPrice(0) : toPrice(70);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const placeOrderHandler = ()=> {
    dispatch(createOrder({...cart, orderItems: cart.cartItems}));
  }
  return (
    <div>
      <Helmet>
        <title>Place Order | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <CheckoutSteps step1 step2 step3 step4/>
        <h1>DELIVERY INFORMATION</h1>
        <div className="row top">
          <div className="col-2 mr-2">
            <ul>
              <li>
                <div className="row top start">
                  <h3 className="mr-2">Delivery Address: </h3>
                  <p>
                    <strong>{shippingAddress.fullName}</strong><br/>
                    {shippingAddress.address}<br/>
                    {shippingAddress.district}-{shippingAddress.postalCode}, {shippingAddress.country} <br/>
                    Phone: {shippingAddress.phoneNumber}
                  </p>
                </div>
              </li>
              <li>
                <div className="row top start">
                  <h3 className="mr-2">Payment Method: </h3>
                  <p>{paymentMethod}</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Order Items: </h3>
                  {cartItems.map(item=> (
                    <div key={item.product} className="row start mb-1">
                      <div className="mr-2">
                        <Link to={`/plant/${slugify(item.name)}`}><img src={baseUrl + item.images[0]} className="small" alt={item.name} /></Link>
                      </div>
                      <div className="min-30">
                        <Link to={`/plant/${slugify(item.name)}`}>{item.name}</Link>
                      </div>
                      <div>{item.qty} x Tk.{item.price} = Tk. {item.qty * item.price}</div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="summaryCont">
              <h3 className="summaryTitle">Order Summary</h3>
              <div className="row">
                <div>Items</div>
                <p>Tk. {cart.itemsPrice}</p>
              </div>
              <div className="row">
                <div>Delivary Charge</div>
                <p>Tk. {cart.shippingPrice}</p>
              </div>
              <div className="row">
                <div><strong>Total</strong></div>
                <p><strong>Tk. {cart.totalPrice}</strong></p>
              </div>
              {loading && <LoadingBox/>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <div>
                <button onClick={placeOrderHandler} className="auth" disabled={cartItems.length === 0}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
