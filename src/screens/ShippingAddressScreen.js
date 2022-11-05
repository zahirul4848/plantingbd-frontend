import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { saveShippingAddress } from '../actions/cartActions';
import { ArrowBackIos } from '@material-ui/icons';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';

export default function ShippingAddressScreen(props) {
  const cart = useSelector(state => state.cart);
  const {shippingAddress, cartItems} = cart;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [district, setDistrict] = useState(shippingAddress.district || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState('Bangladesh');
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '');
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(cartItems.length === 0) {
      props.history.push('/cart');
    }
  }, [cartItems, props.history]);
  const submitHandler = (e)=> {
    e.preventDefault();
    dispatch(saveShippingAddress({fullName, address, district, postalCode, country, phoneNumber}));
    props.history.push('/payment');
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <CheckoutSteps step1 step2/>
        <div className="row">
          <div>
            <div className="xlTitle">DELIVERY INFORMATION</div>
            <p><Link className="link" to="/cart"> <ArrowBackIos/> Return to Cart</Link></p>
          </div>
          <form className="form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" value={fullName} onChange={(e)=> setFullName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <textarea value={address} id="address" onChange={(e)=> setAddress(e.target.value)} required></textarea>
            </div>
            <div>
              <label htmlFor="district">District</label>
              <input type="text" id="district" value={district} onChange={(e)=> setDistrict(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <input type="text" id="postalCode" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <input type="text" id="country" value={country} onChange={(e)=> setCountry(e.target.value)} />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} required />
            </div>
            <button type="submit" className="auth">CONTINUE</button>
          </form>
        </div>
      </div>
      <Footer/>      
    </div>
  )
}
