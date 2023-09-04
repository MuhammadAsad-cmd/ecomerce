import axios from "axios";
import {ADDTOCART,CLEARCART,REMOVETOCART, SAVESHIPPINGINFO} from '../constants/cartConst'

export let addToCart=(quentity,id)=>async(dispatch)=>{
    try {

        let {data} =await axios.get(`http://localhost:1300/api/v1/products/product/${id}`,{withCredentials:true})
let productObj={
    name:data.product.name,
    quentity,
    price:data.product.price,
    stock:data.product.stock,
    image:data.product.image[0].url,
    productId:data.product._id
}
// console.log(productObj);


dispatch({type:ADDTOCART,payload:productObj})

    } catch (error) {
        console.log(error);
    }

}
//remove to cart action
export let removeToCartAction=(productId)=>(dispatch)=>{
    // console.log(productId);
    dispatch({type:REMOVETOCART,payload:productId})
};

// make the cart empty
export let clearCart=()=>(dispatch)=>{
    localStorage.removeItem('cartItems')
   
    dispatch({type:CLEARCART})
};

// use to save shipping info
export let saveShippingInfoAction=(data)=>(dispatch)=>{

    window.localStorage.setItem('shippingDetail',JSON.stringify(data))
    dispatch({type:SAVESHIPPINGINFO,payload:data})
}