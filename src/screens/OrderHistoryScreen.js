import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {historyOrders} from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Details } from '@material-ui/icons';
import { Helmet } from 'react-helmet-async';

export default function OrderHistoryScreen(props) {
  const orderHistory = useSelector(state => state.orderHistory);
  const {loading, error, orders} = orderHistory;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(historyOrders());    
  }, [dispatch]);
  
  return (
    <div>
      <Helmet>
        <title>Your Orders | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="xlTitle">YOUR ORDER HISTORY</div>
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
          <div style={{overflowX: 'auto'}}>
          <table className="table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order=> (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'NO'}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'NO'}</td>
                  <td><button onClick={()=> props.history.push(`/order/${order._id}`)}><Details htmlColor="#00B761" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}
