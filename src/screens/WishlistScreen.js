import { Delete } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listUserWishList, toggleWishListUser } from '../actions/userActions';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_WISHLIST_TOGGLE_RESET } from '../constants/userConstants';
import { Helmet } from 'react-helmet-async';
import { baseUrl } from '../utility';

export default function WishlistScreen() {
  const userWishlistList = useSelector(state => state.userWishlistList);
  const {loading, error, wishlistList} = userWishlistList;
  const userWishlistToggle = useSelector(state => state.userWishlistToggle);
  const {loading: loadingWishlistDelete, error: errorWishlistDelete, success: successWishlistDelete} = userWishlistToggle;
  const dispatch = useDispatch();
  useEffect(() => {
    if(successWishlistDelete) {
      dispatch({type: USER_WISHLIST_TOGGLE_RESET});
    }
    dispatch(listUserWishList());
  }, [dispatch, successWishlistDelete]);
  const deleteWishlist = (productId)=> {
    dispatch(toggleWishListUser(productId));
  }
  return (
    <div>
      <Helmet>
        <title>Favorite Plants | Plantingbd.com</title>
      </Helmet>
      <Header/>
        {loadingWishlistDelete && <LoadingBox/>}
        {errorWishlistDelete && <MessageBox variant="danger">{errorWishlistDelete}</MessageBox>}
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
        <div className="commonScreenContainer">
          <div className="xlTitle">FAVORITES</div>
          {wishlistList.length === 0 && <MessageBox>Your wishlist is empty</MessageBox>}
          {wishlistList.map(wishlist=> (
            <div className="row top" key={wishlist._id}>
              <div>
                <img className="small" src={baseUrl + wishlist.images[0]} alt={wishlist.name} />
              </div>
              <div className="bigTitle"><Link to={`/plant/${wishlist._id}`}>{wishlist.name}</Link></div>
              <div>Tk. {wishlist.price}</div>
              <button onClick={()=> deleteWishlist(wishlist._id)}><Delete htmlColor="#F52A2A" /></button>
            </div>
          ))}
        </div>
        )}
      <Footer/>
    </div>
  )
}
