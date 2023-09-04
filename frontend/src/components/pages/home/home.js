import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './home.css'
import {BiMouse} from 'react-icons/bi'
import Product from '../../product/product'
import MetaData from '../../metaData'
import { useAlert } from 'react-alert'

import {AdminDelClearSms_error, getFeaturedProducts} from '../../redux/actions/productAction'
import Loader from '../../layout/loader/loader'

let Home=()=>{
let alert=useAlert();
    let {products,loading,error}=useSelector((p)=>p.productReducer
    )
    // console.log(products);
    let dispatch=useDispatch();

useEffect(()=>{
    dispatch(getFeaturedProducts());
    if(error){
        alert.error(error);
        dispatch(AdminDelClearSms_error())
    }
},[dispatch,error,alert])

return(
    <>
      <MetaData title="Home"/>

    { loading && <Loader/>}
    <div className='banner' >
        <p>Wellcome to E commerce</p>
        <h2>Find Amazing product here</h2>
        <a href="#HomeHeading1">
        <div className='container'>
          
 
            <p>Scroll</p>
     <BiMouse className='Micon' />
        </div>
        </a>
    </div>
    <h2 id='HomeHeading1'>Featured Products</h2>
    <div className="productContainer">
    { products && products.map((p)=>{
        // console.log(p);
  return <div key={p._id}>
  <Product product={p} />


  </div>

    })}
    
    </div>
    </>
)
}

export default Home