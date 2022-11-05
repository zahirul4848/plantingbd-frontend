import React, { useEffect, useState } from 'react';
import Cover from '../components/Cover';
import Header from '../components/Header';
import CategoryThumbnail from '../components/CategoryThumbnail';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts, listTopRatingProducts } from '../actions/productActions';
import { Helmet } from 'react-helmet-async';


import Slider from 'react-slick';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

const settings = {
  swipeToSlide: true,
  infinite: true,
  autoplay: true,
  autplaySpeed: 2000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
}


export default function HomeScreen() {
  const [mobileDevice, setMobileDevice] = useState(false);
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;
  const productTopRatingList = useSelector(state => state.productTopRatingList);
  const {loading: loadingTopRating, error: errorTopRating, products: productsTopRating} = productTopRatingList;

  useEffect(() => {
    if(window.matchMedia("(max-width: 768px)").matches) {
      setMobileDevice(true);
    }
  }, [])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopRatingProducts());
  }, [dispatch])
  return (
    <div>
      <Helmet>
        <meta name="description" content="We deliver your favorite indoor and outdoor plants right to your end. Shop floor plants, office plants, succulents plants, hanging plants, outdoor plants, indoor plants and many more." />
        <meta name="keywords" content="plantingbd, Plants price in Bangladesh, tree price in bangladesh, Gardening Store near me, Buy Plants Online in Bangladesh, online plants shop bd, online tree shop bd, indoor plants price in bangladesh, Potted plants, Gardening plants in Bangladesh, Gardening Plants Price" />
        <title>Buy Your Favourite Plants Online | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <div className="coverContainer">
          <Cover/>
        </div>
        <div className="categoryThubmnailContainer">
          <CategoryThumbnail/>
        </div>
        <div className="featuredTitle">
          <span>TOP TRENDING PLANTS</span>
        </div>
        {mobileDevice ? (
          <div>
            {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : products && ( 
              <Slider {...settings}>
              {products.map(product=> (
                <ProductCard key={product._id} product={product} />
              ))}
              </Slider>
            )}
          </div>
        ) : (
          <div className="row">
            {loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> : products && ( 
              <>
              {products.map(product=> (
                <ProductCard key={product._id} product={product} />
              ))}
              </>
            )}
          </div>
        )}
        <div className="featuredTitle">
          <span>BEST RATING PLANTS</span>
        </div>
        <div className="row">
          {loadingTopRating ? <LoadingBox/> : errorTopRating ? <MessageBox variant="danger">{errorTopRating}</MessageBox> : productsTopRating && ( 
            <>
            {productsTopRating.map(product=> (
              <ProductCard key={product._id} product={product} />
            ))}
            </>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
