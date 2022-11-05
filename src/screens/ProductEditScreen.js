import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { Helmet } from 'react-helmet-async';
import { baseUrl } from '../utility';

export default function ProductEditScreen(props) {
  const productSlug = props.match.params.productSlug;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [about, setAbout] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product} = productDetails;
  const productUpdate = useSelector(state => state.productUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if(successUpdate) {
      props.history.push('/productlist');
    }
    if(!product || productSlug !== product.slug || successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET});
      dispatch(detailsProduct(productSlug));
    } else {
      setName(product.name);
      setType(product.type);
      setSize(product.size);
      setMetaDescription(product.metaDescription);
      setAbout(product.about);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setImages(product.images);
    }
  }, [dispatch, productSlug, product, successUpdate, props.history]);
  
  const submitHandler = async(e)=> {
    e.preventDefault();
    const newProduct = {
      _id: product._id, name, type, size, metaDescription, about, price, countInStock, images
    }
    if(files) {
      if(files.length > 3) {
        alert('Only 3 images are allowed');
      } else {
        const formData = new FormData();
        formData.append('images', files[0]);
        formData.append('images', files[1]);
        formData.append('images', files[2]);
        setLoadingUpload(true);
        try {
          const {data} = await Axios.post(`${baseUrl}/api/uploads`, formData, {headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
          }});
          newProduct.images = data;
          setLoadingUpload(false);
        } catch (error) {
          setErrorUpload(error.message);
          setLoadingUpload(false);
        }
      }
    }
    dispatch(updateProduct(newProduct));
  }

  return (
    <div>
      <Helmet>
        <title>Admin | Edit Product | Planting</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer row top">
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : product && ( 
          <>
          <div>
            <div className="xlTitle">EDIT PRODUCT: {product._id}</div>
            <div className="profileInfoCont">
              <div className="row">
                {files && files.length === 1 &&
                <>
                <img className="small" src={URL.createObjectURL(files[0])} alt={files[0].name} />
                </>
                }
                {files && files.length === 2 &&
                <>
                <img className="small" src={URL.createObjectURL(files[0])} alt={files[0].name} />
                <img className="small" src={URL.createObjectURL(files[1])} alt={files[1].name} />
                </>
                }
                {files && files.length === 3 &&
                <>
                <img className="small" src={URL.createObjectURL(files[0])} alt={files[0].name} />
                <img className="small" src={URL.createObjectURL(files[1])} alt={files[1].name} />
                <img className="small" src={URL.createObjectURL(files[2])} alt={files[2].name} />
                </>
                }
              </div>
            </div>
          </div>
          <div>
            <div className="xlTitle">Update Product</div>
            <form className="form" onSubmit={submitHandler}>
              <>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={e=> setName(e.target.value)} placeholder="Enter Name" />
              </div>
              <div>
                <label htmlFor="type">Type</label>
                <input type="text" id="type" value={type} onChange={e=> setType(e.target.value)} placeholder="Enter Type" />
              </div>
              <div>
                <label htmlFor="size">Size</label>
                <select value={size} onChange={(e)=> setSize(e.target.value)}>
                  <option value="Mini">Mini</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input type="text" id="price" value={price} onChange={e=> setPrice(e.target.value)} placeholder="Enter Price" />
              </div>
              <div>
                <label htmlFor="countInStock">Count in stock</label>
                <input type="text" id="countInStock" value={countInStock} onChange={e=> setCountInStock(e.target.value)} placeholder="Enter Stock" />
              </div>
              <div>
                <label htmlFor="metaDescription">Meta Description</label>
                <textarea id="metaDescription" value={metaDescription} onChange={e=> setMetaDescription(e.target.value)} placeholder="Enter Meta Description" ></textarea>
              </div>
              <div>
                <label htmlFor="about">About</label>
                <textarea id="about" value={about} onChange={e=> setAbout(e.target.value)} placeholder="Enter Description" ></textarea>
              </div>
              <div>
                <label htmlFor="files">File</label>
                <input type="file" id="files" accept=".png,.jpeg,.jpg" onChange={(e)=> setFiles(e.target.files)} multiple />
              </div>
              {loadingUpload && <LoadingBox/>}
              {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
              {loadingUpdate && <LoadingBox/>}
              {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
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
