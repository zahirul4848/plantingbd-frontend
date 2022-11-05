import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import {baseUrl} from '../utility';

export default function ProductCard({product}) {
  return (
    <div className="productCard">
      <Link to={`/plant/${product.slug}`}>
        <img className="cardImg" src={baseUrl+product.images[0]} alt={product.name} />
      </Link>
      <div className="cardBody">
        <Link to={`/plant/${product.slug}`}><h2>{product.name}</h2></Link>
        <Rating rating={product.rating} numReviews={product.numReviews}/>
        <div>Tk.{product.price}</div>
      </div>
    </div>
  )
}
