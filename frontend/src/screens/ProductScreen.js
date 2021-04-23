
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createReview, detailsProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen (props) {
  const dispatch = useDispatch()
  const productId = props.match.params.id
  const [qty, setQty] = useState(1)
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [tab, setTab] = useState(0)
  const isActive = (index) => {
    if(tab === index) return " active";
    return ""
}

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId))
  }, [dispatch, productId, successReviewCreate])
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`)
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  
  return (
    <div>
      {loading ? (
         <LoadingBox> </LoadingBox>
             ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
      ) : (
    <div>
        <Link to="/"><button
                    type="button"
                    className="primary"
                    
                  >
                    reviene
                  </button></Link>
        <div className="row top">
          <div className="prud">
          <div className="col-3 " >
            <img 
              className="large" 
              src={product.image} 
              alt={product.name}>
            </img>
           
          </div>
      

    </div>
          <div className="col-1" >
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </li>
              <li>Prix : {product.price} DH</li>
              <li>
                Description:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                  <li>
                    Seller{' '}
                    
                  </li>
                <li>
                  <div className="row">
                    <div>Prix</div>
                    <div className="price">{product.price} DH</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="success">Dans Stock</span>
                      ) : (
                        <span className="danger">Unavailable</span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                  <li>
                     <div className="row">
                     <div>Qty</div>
                     <div>
                     <select value={qty} onChange={e => setQty(e.target.value)}>
                        {
                          [...Array(product.countInStock).keys()].map( x =>(
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))
                        }
                     </select>
                     </div>
                     </div>
                  </li>
                  <li>
                  <button onClick={addToCartHandler}
                   className="primary block">Acheter</button>
                </li>
                  </>
               )}
              </ul>
            </div>
          </div>
        </div>
        <div>
            <h2 id="reviews">commentaire</h2>
            {product.reviews.length === 0 && (
              <MessageBox>aucun commentaires</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>écrire vous commentaires </h2>
                    </div>
                    <div>
                      <label htmlFor="rating">évaluation</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Pauvres</option>
                        <option value="2">2- juste</option>
                        <option value="3">3- bon</option>
                        <option value="4">4- tres bon</option>
                        <option value="5">5- Excelente</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Commentair</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    SVP <Link to="/signin">connecté vous</Link> pour écrire un commentaire
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
      </div>
      )}
     
    </div>
  );
}