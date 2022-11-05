import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {summaryOrder} from '../actions/orderActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Chart} from 'react-google-charts';
import { ClipLoader } from 'react-spinners';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { Money, Person, ShoppingCartOutlined } from '@material-ui/icons';
import { Helmet } from 'react-helmet-async';

export default function DashboardScreen() {
  const orderSummary = useSelector(state => state.orderSummary);
  const {loading, error, summary} = orderSummary;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch])
  return (
    <div>
      <Helmet>
        <title>Admin | Dashboard | Planting</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="row center">
          <div className="bigTitle">DASHBOARD</div>
        </div>
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
          <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span className="row start"><Person fontSize="large"/> Users</span>
              </div>
              <div className="summary-body">{summary.users[0] ? summary.users[0].numUsers : 0}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span className="row start"><ShoppingCartOutlined fontSize="large"/> Orders</span>
              </div>
              <div className="summary-body">{summary.orders[0] ? summary.orders[0].numOrders : 0}</div>
            </li>
            <li>
              <div className="summary-title color3">
                <span className="row start"><Money fontSize="large"/> Sales</span>
              </div>
              <div className="summary-body">Tk.{summary.orders[0] ? summary.orders[0].totalSales.toFixed(2) : 0}</div>
            </li>
          </ul>
          <div>
            <div>
              <h3>Sales</h3>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ): (
                <Chart width="100%" height="400px" chartType="AreaChart" loader={<div><ClipLoader loading={true} color="#00B761" size={17}/></div>} data={[['Date', 'Sales'], ...summary.dailyOrders.map(x=> [x._id, x.sales])]} />
              )}
            </div>
            <div>
              <h3>Categories</h3>
              {summary.productCategories.length === 0 ? (
                <MessageBox>No Category</MessageBox>
              ): (
                <Chart width="100%" height="400px" chartType="PieChart" loader={<LoadingBox/>} data={[['Category', 'Products'], ...summary.productCategories.map(x=> [x._id, x.count])]} />
              )}
            </div>
          </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
  )
}
