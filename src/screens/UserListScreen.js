import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { listUsers, deleteUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Delete, Edit } from '@material-ui/icons';
import {USER_DELETE_RESET, USER_DETAILS_RESET} from '../constants/userConstants';
import { Helmet } from 'react-helmet-async';

export default function UserListScreen(props) {
  const userList = useSelector(state => state.userList);
  const {loading, error, users} = userList;
  const userDelete = useSelector(state => state.userDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if(successDelete) {
      dispatch({type: USER_DELETE_RESET});
    }
    dispatch({type: USER_DETAILS_RESET})
    dispatch(listUsers());    
  }, [dispatch, successDelete]);
  const deleteHandler = (userId)=> {
    if(window.confirm('Are you sure want to delete?')) {
      dispatch(deleteUser(userId));
    }
  }
  return (
    <div>
      <Helmet>
        <title>Admin | Users | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="xlTitle">USERS</div>
        {loadingDelete && <LoadingBox/>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
          <div style={{overflowX: 'auto'}}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user=> (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                  <td><button onClick={()=> props.history.push(`/user/${user._id}/edit`)}><Edit htmlColor="#00B761" /></button><button onClick={()=> deleteHandler(user._id)}><Delete htmlColor="#F52A2A" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}
