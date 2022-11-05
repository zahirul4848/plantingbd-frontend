import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowBackIos } from '@material-ui/icons';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';

export default function PaymentMethodScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;
  useEffect(() => {
    if(!shippingAddress.address) {
      props.history.push('/shipping');
    }
  }, [shippingAddress, props.history]);

  const dispatch = useDispatch();
  const submitHandler = (e)=> {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  }
  return (
    <div>
      <Helmet>
        <title>Payment Method | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <CheckoutSteps step1 step2 step3 />
        <div className="row">
          <div>
            <div className="xlTitle">PAYMENT METHOD</div>
            <p><Link className="link" to="/shipping"> <ArrowBackIos/> Return to Shipping Address</Link></p>
          </div>
          <form className="form" onSubmit={submitHandler}>
            <div>
              <div>
                <input type="radio" id="cashOnDelivery" value="Cash on Delivery" onChange={(e)=> setPaymentMethod(e.target.value)} name="paymentMethod" checked />
                <label htmlFor="cashOnDelivery">Cash on Delivery</label>
              </div>
            </div>
            <div>
              <div>
                <input type="radio" id="bkash" value="Bkash" onChange={(e)=> setPaymentMethod(e.target.value)} name="paymentMethod" />
                <label htmlFor="bkash">Bkash</label>
              </div>
            </div>
            <div>
              <div>
                <input type="radio" id="nagad" value="Nagad" onChange={(e)=> setPaymentMethod(e.target.value)} name="paymentMethod" />
                <label htmlFor="nagad">Nagad</label>
              </div>
            </div>
            <button type="submit" className="auth">CONTINUE</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
