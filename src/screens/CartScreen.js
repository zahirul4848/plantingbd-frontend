import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Delete } from '@material-ui/icons'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Helmet } from 'react-helmet-async';
import { baseUrl, slugify } from '../utility';


export default function CartScreen(props) {
  const productId = props.match.params.productId;
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id)=> {
    dispatch(removeFromCart(id));
  }
  const checkoutHandler = ()=> {
    props.history.push('/signin?redirect=shipping');
  }
  return (
    <div>
      <Helmet>
        <title>Cart | Plantingbd.com</title>
        <meta name="description" content="We deliver your favorite indoor and outdoor plants right to your end. Shop floor plants, office plants, succulents plants, hanging plants, outdoor plants, indoor plants and many more." />
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        {cartItems.length === 0 ? <MessageBox>Cart is Empty. <Link className="link" to="/">Go Shopping</Link></MessageBox> : (
          <>
          <div>
            <div className="bigTitle">CART({cartItems.length})</div>
          </div>
          <hr/>
          {cartItems.map(item=> (
            <div key={item.product}>
            <div className="row top mb-1">
              <div className="cartImgTitle">
                <Link to={`/plant/${slugify(item.name)}`}><img className="small cartImgOrder" src={baseUrl + item.images[0]} alt={item.name} /></Link>
                <div className="mediumTitle ml-2"><Link to={`/plant/${slugify(item.name)}`}>{item.name}</Link></div>
              </div>
              <div className="qtyBox">
                <select value={item.qty} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                  {[...Array(item.countInStock).keys()].map(x=> (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
              <div>Tk.{item.price}</div>
              <button onClick={()=> removeFromCartHandler(item.product)}><Delete htmlColor="red"/></button>
            </div>
            <hr/>
            </div>
          ))}
          <div className="subtotalContainer">
            <div className="subtotal">
              <div className="row">
                <h1 className="bigTitle">Subtotal({cartItems.reduce((a, c)=> a + c.qty, 0)})</h1>
                <h1 className="bigTitle">Tk.{cartItems.reduce((a, c)=> a + c.price * c.qty, 0)}</h1>
              </div>
              <hr/>
              <div className="row">
                <button onClick={()=> props.history.push('/')}>CONTINUE SHOPING</button>
                <button onClick={checkoutHandler} className="large">CHECKOUT</button>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
  )
}
