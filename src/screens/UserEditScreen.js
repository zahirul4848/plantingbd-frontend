import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsUser, updateUser } from '../actions/userActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { Helmet } from 'react-helmet-async';


export default function UserEditScreen(props) {
  const userId = props.match.params.userId;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const userDetails = useSelector(state => state.userDetails);
  const {loading, error, user} = userDetails;
  const userUpdate = useSelector(state => state.userUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(successUpdate) {
      dispatch({type: USER_UPDATE_RESET});
    }
    if(!user || userId !== user._id || successUpdate) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user, successUpdate]);
  const submitHandler = (e)=> {
    e.preventDefault();
    dispatch(updateUser({_id: userId, name, email, isAdmin}));
  }
  return (
    <div>
      <Helmet>
        <title>Admin | User Edit | Planting</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer row top">
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : user && ( 
          <>
          <div>
            <div className="xlTitle">EDIT USER: {user.name}</div>
            <div className="profileInfoCont">
              <div className="row">
                <h2>Name:</h2>
                <h2>{user.name}</h2>
              </div>
              <div className="row">
                <h2>Email:</h2>
                <h2>{user.email}</h2>
              </div>
              <div className="row">
                <h2>isAdmin:</h2>
                <h2>{user.isAdmin ? 'YES' : 'NO'}</h2>
              </div>
            </div>
          </div>
          <div>
            <div className="xlTitle">Update User</div>
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
                <label htmlFor="isAdmin">Is Admin</label>
                <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={e=> setIsAdmin(e.target.checked)}/>
              </div>
              {loadingUpdate && <LoadingBox/>}
              {errorUpdate && <MessageBox variant="danger">{error}</MessageBox>}
              {successUpdate && <MessageBox variant="success">User Updated Successfully</MessageBox>}
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
