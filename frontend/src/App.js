import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRouter';
import CartScreen from './screens/cartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRouter';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';

import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';

import Expedition from './service/Expedition';
import politique from './service/politique';
import Mentions from './service/Mentions';
import propose from './service/propose';
import support from './service/support';
import conditions from './service/conditions';


function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
          <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars "></i>
            </button>
            <Link className="brand" to="/">
              HiBuy
            </Link>
          </div>
         
          <div>
          
            <Link to="/cart">
            <i className="fa fa-cart-plus fa-lg"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Profil </Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order </Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                       déconnecter
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin"><i className="fa fa-user fa-lg"></i></Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                 
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
         
      
         
        </header>
        
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
           
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
          
        </aside>
        
       
       

        <main>
       
        <header className="row " >
        <a href="tel:+212707750692"><i class="fa fa-phone"></i> Appelez</a>
        <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          </header>
        
        
          <Route path="/Expedition Et Reteur" component={Expedition}></Route>
          <Route path="/conditions de vente" component={conditions}></Route>
          <Route path="/support" component={support}></Route>
          <Route path="/a propose de nous" component={propose}></Route>
          <Route path="/Mentions légales" component={Mentions}></Route>
          <Route path="/politique de confidentialité" component={politique}></Route>

          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
           <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        
        <footer  >
          <div className="rows">
        
            <div className="Dropup">
            <h5  style={{color:"orange"}} >Nous Services </h5>
         
                <ul className="page" style={{color:"white"}}>
                  <li>
                   <Link to="/Expedition Et Reteur" className="dro" style={{color:"white"}}>Expedition Et Reteur</Link>
                  </li>
                  <li>
                    <Link to="/conditions de vente" className="dro" style={{color:"white"}} >conditions de vente</Link>
                  </li>
                 
                 
                  <li>
                    <Link to="/a propose de nous" className="dro" style={{color:"white"}}>a propose de nous</Link>
                  </li>
                  
                  
                  <li>
                    <Link to="/politique de confidentialité" className="dro" style={{color:"white"}}>politique de confidentialité</Link>
                  </li>
            </ul>
              
                
              </div>
                
        
              
        
            <div className="Dropup">
            <h5 style={{color:"orange"}} > Rejoignez-nous </h5>
            
             
             
            <ul className="social" style={{color:"white"}}>
              <li style={{color:"white"}}> <a href="https://www.facebook.com/amine.arjdal/" style={{color:"white"}}> <i class="fa fa-facebook"> Facebook</i></a></li>
              <li>  <a href=""><i class="fa fa-instagram" style={{color:"white"}}>Instagram</i></a> </li>
               <li> <a href="https://www.pinterest.fr/hibuyinfo4" style={{color:"white"}}><i class="fa fa-pinterest" >Pintrest</i></a></li>
               </ul>
            </div>
            </div>
         

        <strong className="rop ">
        
          <div className="ropp">
              <ul>
            <div className=""  >
            <li  style={{color:"orange"}} > Contacter nous</li>
            <li className="what"> <a href="https://wa.me/+212707750692" style={{color:"white"}} ><i class="fa fa-whatsapp" > Whatsapp</i></a></li>
             
             <li style={{color:"white"}}> <a className="tele" href="tel:+212707750692" style={{color:"white"}}> 
                 
                   <i class=  "fa fa-phone" style={{color:"white"}}></i> +212707750692  </a>
                   </li>

                   <li > G-mail :<a href="https://mail.google.com/hibuy.info4@gmail.com/" 
                   style={{color:"white"}}>hibuy.info4@gmail.com </a></li>
              </div> 
              <li className="right" style={{color:"white"}} > Copyright  &copy; 2021 HiBuy </li>
              </ul>
          </div>
        </strong>

      </footer>
        
       
       
      </div>
      
    </BrowserRouter>
  );
}
export default App;