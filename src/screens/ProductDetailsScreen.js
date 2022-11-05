import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Rating from '../components/Rating';
import ProductCard from '../components/ProductCard';
import { createReview, detailsProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { detailsUser, toggleWishListUser } from '../actions/userActions';
import { USER_WISHLIST_TOGGLE_RESET } from '../constants/userConstants';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Helmet } from 'react-helmet-async';
import { baseUrl } from '../utility';


export default function ProductDetailsScreen(props) {
  const [currentImg, setCurrentImg] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [qty, setQty] = useState(1);
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const productSlug = props.match.params.productSlug;
  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product} = productDetails;
  const productList = useSelector(state => state.productList);
  const {loading: loadingType, error: errorType, products: productsType} = productList;
  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate,} = productReviewCreate;

  // wishlist
  const userDetails = useSelector(state => state.userDetails);
  const {user} = userDetails;
  const userWishlistToggle = useSelector(state => state.userWishlistToggle);
  const {success: successWishlist} = userWishlistToggle;

  const dispatch = useDispatch();
  useEffect(() => {
    if(userInfo) {
      if(!user || successWishlist) {
        dispatch({type: USER_WISHLIST_TOGGLE_RESET});
        dispatch(detailsUser(userInfo._id));
      }
    }
  }, [dispatch, user, userInfo, successWishlist]);

  const toggleWishlist = ()=> {
    if(userInfo) {
      dispatch(toggleWishListUser(product._id));
    } else {
      props.history.push(`/signin?redirect=plant/${productSlug}`);
    }
  }

  // done wishlist
  useEffect(() => {
    if(successReviewCreate) {
      window.alert('Review Submitted Successfully, Your Review will publish soon.');
      setComment('');
      setRating('');
      dispatch({type: PRODUCT_REVIEW_CREATE_RESET});
    } 
    if(!product || product.slug !== productSlug) {
      dispatch(detailsProduct(productSlug));
    } else {
      dispatch(listProducts({category: product.type}));
    }
  }, [dispatch, productSlug, successReviewCreate, product]);
  
  const addToCartHandler = ()=> {
    props.history.push(`/cart/${product._id}?qty=${qty}`);
  }
  const submitHandler = (e)=> {
    e.preventDefault();
    if(rating && comment) {
      dispatch(createReview(product._id, {rating, comment, name: userInfo.name}));
    } else {
      alert('Please enter rating and review');
    }
  }

  return (
    <div>
      <Header/>
      {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : ( product &&
      <div className="commonScreenContainer">
      <Helmet defaultTitle="Planting">
        <meta name="description" content={product.metaDescription} />
        <meta name="keywords" content={`${product.name} plant price in Bangladesh, ${product.name} plant, buy ${product.name} plants online`}/>
        <title>{product.name || 'Plants'} | Plantingbd.com </title>
      </Helmet>
        <div className="productDetailsContainer">
          <div className="productDetailsLeft">
            {product.images.map((image, index)=> (
              <div key={index} onClick={()=> setCurrentImg(index)}>
                <img className="small" src={baseUrl + image} alt={product.name} />
              </div>
            ))}
          </div>
          <div className="productDetailsMiddle">
            <img className="large" src={baseUrl + product.images[currentImg]} alt={product.name} />
            <p>{product._id}</p>
            <div className="detailsFavoriteIcon">
              {user && user.wishlist.includes(product._id) ? (
                <Favorite onClick={toggleWishlist} fontSize="large" htmlColor="red" />
              ) : (
                <FavoriteBorder onClick={toggleWishlist} fontSize="large" htmlColor="white" />
              )}
            </div>
          </div>
          <div className="productDetailsRight">
            <h1 className="bigTitle">{product.name}</h1>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <p>Price: Tk. {product.price}</p>
            <p>Status: {product.countInStock > 0 ? <span className="stock">In Stock</span> : <span className="unavailable">Unavailable</span>}</p>
            <div className="row start mb-1">
              <div>Qty: </div>
              <div className="qtyBox">
                <select value={qty} onChange={e=> setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map(x=> (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="large" onClick={addToCartHandler} disabled={product.countInStock < 1}>ADD TO CARD</button>
          </div>
        </div>
        <div className="m-4">
          <div className="bigTitle center">PLANT DESCRIPTION</div>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {product.about}
          </ReactMarkdown>
          {/* <ul>
            <li>{product.about}</li>
          </ul> */}
        </div>
        <div className="m-4">
          <div className="bigTitle center">YOU MAY ALSO LIKE</div>
          <div className="row center">
            {loadingType ? <LoadingBox/> : errorType ? <MessageBox variant="danger">{errorType}</MessageBox> : productsType && ( 
              <>
              {productsType.map(product=> (
                <ProductCard key={product._id} product={product} />
              ))}
              </>
            )}
          </div>
        </div>
        <div className="m-4">
          <div className="bigTitle center">CUSTOMER REVIEWS</div>
          {product.reviews.length === 0 && (
            <p>There is no review in this plant yet</p>
          )}
          <ul>
            {product.reviews.map(review=> (
              <li key={review._id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating} caption=" "/>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </li>
            ))}
            <li>
              {userInfo ? (
                <form className="form" onSubmit={submitHandler}>
                  <div>
                    <select id="rating" value={rating} onChange={e=> setRating(e.target.value)}>
                      <option value="">Select...</option>                       
                      <option value="1">1- Poor</option>                       
                      <option value="2">2- Fair</option>                       
                      <option value="3">3- Good</option>                       
                      <option value="4">4- Very Good</option>                       
                      <option value="5">5- Excelent</option>                       
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea id="comment" value={comment} onChange={e=> setComment(e.target.value)}></textarea>
                  </div>
                  <div>
                    {loadingReviewCreate && <LoadingBox/>}
                    {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                  </div>
                  <button className="auth" type="submit">Submit</button>
                </form>
              ) : <MessageBox>Please <Link className="link" to={`/signin?redirect=/plant/${product._id}`}>Sign In</Link> to review this product</MessageBox>}
            </li>
          </ul>
        </div>
      </div>
      )}
      <Footer/>
    </div>
  )
}
