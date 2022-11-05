import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmOrder, deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CONFIRM_RESET, ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import {Helmet} from 'react-helmet-async';
import { baseUrl, slugify } from '../utility';

export default function OrderScreen(props) {
  const orderId = props.match.params.orderId;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const orderDetails = useSelector(state => state.orderDetails);
  const {loading, error, order} = orderDetails;
  const orderConfirm = useSelector(state => state.orderConfirm);
  const {loading: loadingConfirm, error: errorConfirm, success: successConfirm} = orderConfirm;
  const orderDeliver = useSelector(state => state.orderDeliver);
  const {loading: loadingDeliver, error: errorDeliver, success: successDeliver} = orderDeliver;
  const orderPay = useSelector(state => state.orderPay);
  const {loading: loadingPay, error: errorPay, success: successPay} = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if(!order || successConfirm || successDeliver || successPay || (order && order._id !== orderId)) {
      dispatch({type: ORDER_CONFIRM_RESET});
      dispatch({type: ORDER_DELIVER_RESET});
      dispatch({type: ORDER_PAY_RESET});
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, orderId, order, successPay, successDeliver, successConfirm]);

  const handleConfirmed = ()=> {
    dispatch(confirmOrder(orderId));
  }
  const handleDeliver = ()=> {
    dispatch(deliverOrder(orderId));
  }
  const handlePay = ()=> {
    dispatch(payOrder(orderId));
  }
  return (
    <div>
      <Helmet>
        <title>Order | Plantingbd.com</title>
      </Helmet>
      <Header/>
      {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : order && (
        <div className="commonScreenContainer">
          <h1>ORDER DETAILS: {order._id}</h1>
          {props.location.search && <MessageBox variant="success mb-1">Your order is created successfully. Order will be confirmed soon and a confirmation email will be sent to your email.</MessageBox>}
          <div className="row top">
            <div className="col-2 mr-2">
              <ul>
                <li>
                  <div className="row top start">
                    <h3 className="mr-2">Delivery Address: </h3>
                    <p>
                      <strong>{order.shippingAddress.fullName}</strong><br/>
                      {order.shippingAddress.address}<br/>
                      {order.shippingAddress.district}-{order.shippingAddress.postalCode}, {order.shippingAddress.country} <br/>
                      Phone: {order.shippingAddress.phoneNumber}
                    </p>
                  </div>
                  {order.isConfirmed ? <MessageBox variant="success">Order confirmed on {order.confirmedAt.substring(0, 10)}</MessageBox> : <MessageBox variant="danger">Order will be confirmed</MessageBox>}
                  {order.isDelivered ? <MessageBox variant="success">Delivered on {order.deliveredAt.substring(0, 10)}</MessageBox> : <MessageBox variant="danger">Not Delivered yet</MessageBox>}
                </li>
                <li>
                  <div className="row top start">
                    <h3 className="mr-2">Payment Method: </h3>
                    <p>{order.paymentMethod}</p>
                  </div>
                  {order.isPaid ? <MessageBox variant="success">Paid on {order.paidAt.substring(0, 10)}</MessageBox> : <MessageBox variant="danger">Not Paid yet</MessageBox>}
                </li>
                <li>
                  <div>
                    <h3>Order Items: </h3>
                    {order.orderItems.map(item=> (
                      <div key={item.product} className="row start mb-1">
                        <div className="mr-2">
                          <Link to={`/plant/${slugify(item.name)}`}><img src={baseUrl + item.images[0]} className="small" alt={item.name}/></Link>
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
                  <p>Tk. {order.itemsPrice}</p>
                </div>
                <div className="row">
                  <div>Delivary Charge</div>
                  <p>Tk. {order.shippingPrice}</p>
                </div>
                <div className="row">
                  <div><strong>Total</strong></div>
                  <p><strong>Tk. {order.totalPrice}</strong></p>
                </div>
                {loading && <LoadingBox/>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loadingConfirm && <LoadingBox/>}
                {errorConfirm && <MessageBox variant="danger">{errorConfirm}</MessageBox>}
                {loadingDeliver && <LoadingBox/>}
                {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                {loadingPay && <LoadingBox/>}
                {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                <div>
                  {userInfo.isAdmin && !order.isConfirmed && <button className="auth" onClick={handleConfirmed}>CONFIRM NOW</button>}
                  {userInfo.isAdmin && !order.isDelivered && <button className="auth" onClick={handleDeliver}>DELIVER NOW</button>}
                  {userInfo.isAdmin && !order.isPaid && <button className="auth" onClick={handlePay}>PAY NOW</button>} 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  )
}
