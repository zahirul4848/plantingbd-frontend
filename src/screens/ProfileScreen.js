import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { Helmet } from 'react-helmet-async';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const userDetails = useSelector(state => state.userDetails);
  const {loading, error, user} = userDetails;
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdateProfile;


  const dispatch = useDispatch();
  useEffect(() => {
    if(!user || successUpdate) {
      dispatch({type: USER_UPDATE_PROFILE_RESET});
      dispatch(detailsUser(userInfo._id));
    }
  }, [dispatch, user, userInfo, successUpdate]);

  const submitHandler = (e)=> {
    e.preventDefault();
    if(password !== confirmedPassword) {
      alert('Password and Confirmed Password are not matched');
    } else {
      dispatch(updateUserProfile({name, email, password}));
    }
  }
  return (
    <div>
      <Helmet>
        <title>Your Profile | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer row top">
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : user && ( 
          <>
          <div>
            <div className="xlTitle">Hello, {user.name}</div>
            <div className="profileInfoCont">
              <div className="row">
                <h2>Name:</h2>
                <h2>{user.name}</h2>
              </div>
              <div className="row">
                <h2>Email:</h2>
                <h2>{user.email}</h2>
              </div>
            </div>
          </div>
          <div>
            <div className="xlTitle">Update Profile</div>
            <form className="form" onSubmit={submitHandler}>
              <>
              <div>
                <label htmlFor="name">Name</label>
                <input minLength="3" type="text" id="name" value={name} onChange={e=> setName(e.target.value)} placeholder="Enter Name" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={e=> setEmail(e.target.value)} placeholder="Enter Email" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input minLength="6" type="password" id="password" onChange={e=> setPassword(e.target.value)} placeholder="Enter password" />
              </div>
              <div>
                <label htmlFor="confirmedPassword">Confirmed Password</label>
                <input type="password" id="confirmedPassword" onChange={e=>  setConfirmedPassword(e.target.value)} placeholder="Enter confirmed password" />
              </div>
              {loadingUpdate && <LoadingBox/>}
              {errorUpdate && <MessageBox variant="danger">{error}</MessageBox>}
              {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
              <button className="auth" type="submit">Update</button>
              </>
            </form>
          </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
  )
}
