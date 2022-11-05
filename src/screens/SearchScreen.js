import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {listProductCategory, listProducts, listProductSize} from '../actions/productActions';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { Helmet } from 'react-helmet-async';

export default function SearchScreen(props) {
  const {name = 'all', category = 'all', size = 'all', min = 0, max = 0, rating = 0, order = 'newest', pageNumber = 1} = useParams();
  const productList = useSelector(state => state.productList);
  const {loading, error, products, page, pages} = productList;
  const productCategoryList = useSelector(state => state.productCategoryList);
  const {categories} = productCategoryList;
  const productSizeList = useSelector(state => state.productSizeList);
  const {sizes} = productSizeList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductSize());
    dispatch(listProductCategory());
    dispatch(listProducts({name: name !== 'all' ? name : '', category: category !== 'all' ? category : '', size: size !== 'all' ? size : '', min, max, rating, order, pageNumber}));
  }, [dispatch, category, name, min, max, rating, order, pageNumber, size]);

  const getFilterUrl = (filter)=> {
    const filterName = filter.name || name;
    const filterCategory = filter.category || category;
    const filterSize = filter.size || size;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterPage = filter.page || pageNumber;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;   
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/plants/category/${filterCategory}/name/${filterName}/size/${filterSize}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  }
  return (
    <div>
    <Helmet>
      <meta name="description" content={`We deliver your favorite ${category === 'all' ? '' : category} plants right to your end. Visit our website and shop ${category === 'all' ? '' : category} plants and many more.`} />
      <meta name="keywords" content={`${category === 'all' ? '' : category} Plants price in Bangladesh, ${category === 'all' ? '' : category} tree price in bangladesh, Buy ${category === 'all' ? '' : category} plants Online in Bangladesh, online ${category === 'all' ? '' : category} plants shop bd, online ${category === 'all' ? '' : category} tree shop bd`} />
      <title>{category === 'all' ? 'Buy All Plants Online' : `Buy ${category} Plants Online`} | Plantingbd.com</title>
    </Helmet>
      <Header/>
      <div className="sortbarCont">
        <div className="row">
          <select className="sortMenu" onChange={(e)=> props.history.push(getFilterUrl({order: e.target.value}))}>
            <option style={{display:'none'}} value="">Sort</option>
            <option value="newest">New Arivals</option>
            <option value="abcd">Name A to Z</option>
            <option value="dcba">Name Z to A</option>
            <option value="lowest">Price low to high</option>
            <option value="highest">Price high to low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
          <select className="sortMenu" value={size} onChange={(e)=> props.history.push(getFilterUrl({size: e.target.value}))}>
            <option value="all">All Sizes</option>
            {sizes && sizes.map(s=> (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select className="sortMenu" value={category} onChange={(e)=> props.history.push(getFilterUrl({category: e.target.value}))}>
            <option value="all">All Type</option>
            {categories && categories.map(c=> (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
          <p>{products.length} Results</p>
        )}
      </div>
      <div className="commonScreenContainer">
        {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : ( 
          <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map(product=> (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="row center pagination">
            {[...Array(pages).keys()].map(x=> (
              <Link key={x + 1} className={x + 1 === page ? 'active' : ''} to={getFilterUrl({page: x + 1})}>{x + 1}</Link>
            ))}
          </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
  )
}
