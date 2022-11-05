import React, {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Delete, Edit } from '@material-ui/icons';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';
import { Helmet } from 'react-helmet-async';

export default function ProductListScreen(props) {
  const {pageNumber = 1} = useParams();
  const productList = useSelector(state => state.productList);
  const {loading, error, products, page, pages} = productList;
  const productDelete = useSelector(state => state.productDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;
  const productCreate = useSelector(state => state.productCreate);
  const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if(successCreate) {
      dispatch({type: PRODUCT_CREATE_RESET});
      props.history.push(`/product/${createdProduct.slug}/edit`);
    }
    if(successDelete) {
      dispatch({type: PRODUCT_DELETE_RESET});
    }
    dispatch(listProducts({pageNumber}));   
  }, [dispatch, pageNumber, successDelete, createdProduct, successCreate, props.history]);

  const createHandler = ()=> {
    dispatch(createProduct());
  }
  const deleteHandler = (productId)=> {
    if(window.confirm('Are you sure want to delete?')) {
      dispatch(deleteProduct(productId));
    }
  }
  return (
    <div>
      <Helmet>
        <title>Admin | Productlist | Planting</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="row">
          <div className="xlTitle">PRODUCTS</div>
          <button onClick={createHandler} className="large">CREATE PRODUCT</button>
        </div>
        {loadingCreate && <LoadingBox/>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loadingDelete && <LoadingBox/>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
          <>
          <div style={{overflowX: 'auto'}}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>TYPE</th>
                <th>SIZE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product=> (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.type}</td>
                  <td>{product.size}</td>
                  <td><button onClick={()=> props.history.push(`/product/${product.slug}/edit`)}><Edit htmlColor="#00B761" /></button><button onClick={()=> deleteHandler(product._id)}><Delete htmlColor="#F52A2A" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="row end pagination">
            {[...Array(pages).keys()].map(x=> (
              <Link key={x + 1} className={x + 1 === page ? 'active' : ''} to={`/productlist/pageNumber/${x + 1}`}>{x + 1}</Link>
            ))}
          </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
  )
}
