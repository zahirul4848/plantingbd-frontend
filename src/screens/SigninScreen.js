import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Helmet } from 'react-helmet-async';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const {loading, userInfo, error} = userSignin;
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const submitHandler = (e)=> {
    e.preventDefault();
    dispatch(signin(email, password));
  }
  useEffect(() => {
    if(userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
      <div>
      <Helmet>
        <title>Login | Plantingbd.com</title>
        <meta name="description" content="Login to explore your favorite plants"/>
      </Helmet>
        <Header/>
        <div className="commonScreenContainer">
          <div className="row">
            <div>
              <div className="xlTitle">LOG IN TO YOUR ACCOUNT</div>
              <p>Don't have an account? <Link className="link" to={`/register?redirect=${redirect}`}>Create account</Link></p>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
              </div>
              <Link to="/forgotpassword" className="link">Forgot Password?</Link>
              {loading && <LoadingBox/>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <button type="submit" className="auth">SIGN IN</button>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
  )
}
