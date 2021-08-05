import React, { useEffect } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch,useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import profileImage from '../images/de.jpeg';


export default function HomeScreen() {
  const dispatch = useDispatch();
 const productList = useSelector((state) =>state.productList);
 const { loading, error, products} = productList;

 const userTopSellersList = useSelector((state) => state.userTopSellersList);
 const {
   loading: loadingSellers,
   error: errorSellers,
   users: sellers,
 } = userTopSellersList;

  useEffect(() =>{
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  },[dispatch]);
  return (
    

    <div>
     <h2>Meilleures Ventes</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>Non Vente Trouvez</MessageBox>}
          <Carousel autoPlay ={true} className="carousel-slider" >
                <div>
                    <img src={profileImage} alt="profile-image"/>
                    <p className="legend"  style={{color:"orange"}}>Legend 1</p>
                </div>
                <div>
                    <img src="" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="../images/bzdam.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="../images/bl.jpeg" />
                    <p className="legend"> </p>
                </div>
               
            </Carousel>
        </>
      )}
      <h2>Nouveau Produits</h2>
    {loading? (
      <LoadingBox></LoadingBox>
      ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>Non Produit Trouve</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
  )}
  
               
      
    </div>
  );
}

