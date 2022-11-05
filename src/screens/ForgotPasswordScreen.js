import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { forgotPassword } from '../actions/userActions';
import { Helmet } from 'react-helmet-async';

export default function ForgotPasswordScreen(props) {
  const [email, setEmail] = useState('');
  const userForgotPassword = useSelector(state => state.userForgotPassword);
  const {loading, error, forgotMessage, success} = userForgotPassword;

  useEffect(() => {
    if(success) {
      alert('Reset Link has been sent to your email. Please check email');
      props.history.push('/')
    }
  }, [success, props.history]);

  const dispatch = useDispatch();
  const submitHandler = (e)=> {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }
  return (
    <div>
      <Helmet>
        <title>Forgot Password | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="row">
          <div>
            <div className="xlTitle">RESET YOUR PASSWORD</div>
            <p>We will send you an email to reset your password. Please check your email after providing email address.</p>
            <p><Link className="link" to="/signin">Return to login</Link></p>
          </div>
          <form className="form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>
            {loading && <LoadingBox/>} 
            {error && <MessageBox variant="danger">{error}</MessageBox>}  {forgotMessage && <MessageBox variant="success">Reset Link has been sent to your email address</MessageBox>}
            <button type="submit" className="auth">SUBMIT</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
