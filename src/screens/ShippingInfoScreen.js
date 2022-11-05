import { DoubleArrow } from '@material-ui/icons';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

export default function ShippingInfoScreen() {
  return (
    <div>
      <Helmet>
        <title>Shipping Info | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="xlTitle">SHIPPING INFO</div>
        <p>We do everything we can to ensure your plant is shipped safely, efficiently,<br/>and in a timeframe that’s convenient for you or your recipient.</p>
        <h2>Conditions:</h2>
        <ul>
          <li className="shippingInfoList"><DoubleArrow/> We pride ourselves on fast and easy plant delivery on a huge selection of plant types.</li>
          <li className="shippingInfoList"><DoubleArrow/> Shipping cost may vary in case of size, type and location.</li>
          <li className="shippingInfoList"><DoubleArrow/> We will let you know if shipping cost increase more than standard shipping cost during order confirmation.</li>
          <li className="shippingInfoList"><DoubleArrow/> Plants arrive fresh from our growers, potted, and carefully packaged to ensure peak freshness.</li>
          <li className="shippingInfoList"><DoubleArrow/> Outside Dhaka, plants will be delivered by courier service.</li>
          <li className="shippingInfoList"><DoubleArrow/> Plants will be thirsty when they arrive. Please water promptly.</li>
        </ul>
        <div className="row center">
          <img className="delivery" src="/delivery.jpg" alt="delivery" />     
        </div>    
      </div>
      <Footer/>
    </div>
  )
}
