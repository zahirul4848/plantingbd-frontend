import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { resetPassword } from '../actions/userActions';
import { Helmet } from 'react-helmet-async';


export default function ResetPasswordScreen(props) {
  const resetLink = props.match.params.id;
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const userResetPassword = useSelector(state => state.userResetPassword);
  const {loading, error, success} = userResetPassword;

  const dispatch = useDispatch();
  const submitHandler = (e)=> {
    e.preventDefault();
    if(newPassword !== confirmedPassword) {
      alert('New password and confirmed password are not matched');
    } else {
      dispatch(resetPassword(resetLink, newPassword));
    }   
  }
  useEffect(() => {
    if(success) {
      props.history.push('/signin');
    }    
  }, [success, props.history]);

  return (
    <div>
      <Helmet>
        <title>Reset Password | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="row">
          <div>
            <div className="xlTitle">ENTER A NEW PASSWORD</div>
            <p>Your password should be minimum 6 character long.</p>
            <p><Link className="link" to="/signin">Return to login</Link></p>
          </div>
          <form className="form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input minLength="6" type="password" id="newPassword" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirmedPassword">Confirmed Password</label>
              <input type="password" id="confirmedPassword" value={confirmedPassword} onChange={(e)=> setConfirmedPassword(e.target.value)} />
            </div>
            {loading && <LoadingBox/>} 
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <button type="submit" className="auth">SUBMIT</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
