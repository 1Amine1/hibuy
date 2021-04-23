import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';


export default function Product(props) {
  const { product } = props;

  
  return (
    <div key={product._id} className="cardd" >
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image } alt={product.name} />
      </Link>
      <div className="card-body">
        <Link className="nome" to={`/product/${product._id}`}>
          <h2 style={{color:"black"}}>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">{product.price} DH</div>
         
        </div>
      </div>
    </div>
  );
}