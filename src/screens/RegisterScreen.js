import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Helmet } from 'react-helmet-async';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const {loading, userInfo, error} = userRegister;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  
  const dispatch = useDispatch();
  const submitHandler = (e)=> {
    e.preventDefault();
    if(password !== confirmedPassword) {
      alert('Password and Confirmed Password are not matched');
    } else {
      dispatch(register(name, email, password));
    }
  }
  
  useEffect(() => {
    if(userInfo) {
      props.history.push(redirect);
    } 
  }, [props.history, userInfo, redirect]);

  return (
    <div>
      <Helmet>
        <title>Register | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="row">
          <div>
            <div className="xlTitle">CREATE YOUR ACCOUNT</div>
            <p>Do you already have an account? <Link className="link" to={`/signin?redirect=${redirect}`}>Log In</Link></p>
          </div>
          <form className="form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="name">Full Name</label>
              <input minLength="3" type="text" id="name" value={name} onChange={(e)=> setName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input minLength="6" maxLength="12" type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="confirmedPassword">Confirmed Password</label>
              <input type="password" id="confirmedPassword" value={confirmedPassword} onChange={(e)=> setConfirmedPassword(e.target.value)} required />
            </div>
            {loading && <LoadingBox/>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <button type="submit" className="auth">REGISTER</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
