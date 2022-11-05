import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteOrder, listOrders} from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Delete, Details } from '@material-ui/icons';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import { Helmet } from 'react-helmet-async';

export default function OrderListScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const {loading, error, orders} = orderList;
  const orderDelete = useSelector(state => state.orderDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if(successDelete) {
      dispatch({type: ORDER_DELETE_RESET});
    }
    dispatch(listOrders());    
  }, [dispatch, successDelete]);
  const deleteHandler = (orderId)=> {
    if(window.confirm('Are you sure want to delete')) {
      dispatch(deleteOrder(orderId));
    }
  }
  return (
    <div>
      <Helmet>
        <title>Admin | Orderlist | Planting</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="xlTitle">ORDERS</div>
        {loadingDelete && <LoadingBox/>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
          <div style={{overflowX: 'auto'}}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>CONFIRMED</th>
                <th>DELIVERED</th>
                <th>PAID</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order=> (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isConfirmed ? order.confirmedAt.substring(0, 10) : 'NO'}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'NO'}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'NO'}</td>
                  <td><button onClick={()=> props.history.push(`/order/${order._id}`)}><Details htmlColor="#00B761" /></button><button onClick={()=> deleteHandler(order._id)}><Delete htmlColor="#F52A2A" /></button></td>
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
