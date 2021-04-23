import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveChippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch(); 

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(
            saveChippingAddress({fullName, address, city, postalCode, country})
            );
            props.history.push('/payment');
        
    };
  return (
        <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                 <h1>Shipping Address</h1> 
                </div>
            <div>
                  <label htmlFor="fullName">Nome Complete</label>
                  <input 
                  type="text" 
                  id="fallName" 
                  placeholder="Nome Complete" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  ></input>
                </div>
           <div>
              <label htmlFor="city">Ville </label>
              
                      <select
                        id="city"
                        value={city} 
                            onChange={(e) => setCity(e.target.value)}
                    >
                        <option value="">Select...</option>
                        <option value="1">Marrakech</option>
                        <option value="2">Casa-blanca</option>
                        <option value="3">Rabat</option>
                        <option value="4">Fes</option>
                        <option value="5">Essouira</option>
                        <option value="5">Bengrire</option>
                        <option value="5">Agadir</option>
                        <option value="5">Meknes</option>
                      </select>
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input 
                type="text" 
                id="address" 
                placeholder="Address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                required
                ></input>
              </div>
            
        <div>
            <label htmlFor="postalCode">Infos complémentaires</label>
            <input 
            type="text" 
            id="postalCodee" 
            placeholder="Adresse infos" 
            value={postalCode} 
            onChange={(e) => setPostalCode(e.target.value)}
            required
            ></input>
          </div>
        <div>
          <label htmlFor="country">Numéro de téléphone</label>
          <input 
          type="number" 
          id="country" 
          placeholder="entre Numéro de téléphone" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)}
          required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">Continue</button>
        </div>
    </form>
        </div>
    );
}
